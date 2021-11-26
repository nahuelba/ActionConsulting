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
    this.authService.getUserLogged().subscribe(
      res=> {
        if(res!==null){
          this.Router.navigate(['personal'])
        }
      }
    )
  }

  login(){
    console.log(this.loginForm.value)

    const { email, password, remember } = this.loginForm.value

    this.afAuth.setPersistence(remember ? 'local': 'session').then(()=>{

      this.authService.login(email, password)
      .then(res =>{
        console.log(res);
        if(res!==null){
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
          // this.Router.navigate(['personal']);
        }
      }, 
      err => console.log(err))

    })

  }



}
