import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tipo!:string;

  error=""



  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  })


  constructor(
    private authService: AuthService,
    private router:Router,
    private titleService: Title
      ) {

    
   }

  ngOnInit(): void {
    this.titleService.setTitle('Ingresar | ACTION HUMAN CAPITAL CONSULTING');

    if(this.router.url.includes('personal')){

      this.tipo = '/personal'

    }else if(this.router.url.includes('empresa')){
      this.tipo = '/empresa'
    }else{
      this.router.navigate(['/personal']);
    }
  }

  


  googleSignIn(){
    this.authService.SigninWithGoogle(this.tipo)
  }

  // facebookSignIn(){

  // }



}
