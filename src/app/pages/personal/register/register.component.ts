import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error="";
  registerForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  })

  constructor(
    private authService: AuthService,
    private Router:Router) { }

  ngOnInit(): void {

    this.authService.getUserLogged().subscribe(
      res=> {
        if(res!==null){
          this.Router.navigate(['personal'])
        }
      }
    )
  }


  register(){
    console.log(this.registerForm.value)

    if(this.registerForm.value.password==this.registerForm.value.password2){
      const {email, password} = this.registerForm.value
      this.authService.register(email, password)
      .then(res =>{
        console.log(res);
        if(res!==null){
          switch(res.code){

            case "auth/invalid-email":
              this.error="El Email es inválido."
              break;

            case "auth/weak-password":
              this.error="La contraseña debe tener una longitud de 6 o mas."
              break;

            case "auth/email-already-in-use":
              this.error="El email ya está en uso."
              break;
          }
        }
      })

    }else{
      this.error="Las contraseñas no coinciden"
    }
  }
}
