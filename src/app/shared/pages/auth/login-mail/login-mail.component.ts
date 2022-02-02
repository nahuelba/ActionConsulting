import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-mail',
  templateUrl: './login-mail.component.html',
  styleUrls: ['./login-mail.component.css']
})
export class LoginMailComponent implements OnInit {

  tipo!:string

  error=""

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  })

  constructor( private authService: AuthService, 
    private router:Router, 
    private afAuth: AngularFireAuth,
    private spinner:NgxSpinnerService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Ingresar con Email | ACTION HUMAN CAPITAL CONSULTING');
    if(this.router.url.includes('personal')){

      this.tipo = '/personal'

    }else if(this.router.url.includes('empresa')){
      this.tipo = '/empresa'
    }else{
      this.router.navigate(['/personal']);
    }
  }

  login(){
    this.spinner.show()
    console.log(this.loginForm.value)

    const { email, password, remember } = this.loginForm.value

    this.afAuth.setPersistence(remember ? 'local': 'session').then(()=>{

      this.authService.login(email, password)
      .then((res:any) =>{
        console.log(res);
        if(res!==null){
          if(res.code){
            switch(res.code){
  
              case "auth/wrong-password":
                this.error="La contraseña es inválida."
                break;
              
              case "auth/user-not-found":
                this.error="El email no corresponde a un usuario existente."
                break;
  
              case "auth/invalid-email":
                this.error="El Email es inválido."
                break;
            }
            this.spinner.hide()
            return;
          }


          //detectar que tipo es la cuenta y redirigir
          this.authService.getUserAfs(res.user.uid)
          .subscribe((user:any) => {
            this.spinner.hide()
            this.router.navigate([user.tipo]);
            
            
          })  
        }
      }, 
      err => console.log(err))

    })

  }

}
