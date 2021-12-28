import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error=""



  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  })

  currentUser: any = null;

  constructor(
    private authService: AuthService, 
    private Router:Router, 
    private afAuth: AngularFireAuth ) {

    this.afAuth.authState.subscribe((user) => (this.currentUser = user));
    
   }

  ngOnInit(): void {
    
  }

  login(){
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
            return;
          }


          //detectar que tipo es la cuenta y redirigir
          this.authService.getUser()
          .subscribe(users => {
            users.forEach((user:any) => {
              if(user.user == res.user.uid){
                this.Router.navigate([user.tipo]);
                
              }
            })
          })
        }
      }, 
      err => console.log(err))

    })

  }



}
