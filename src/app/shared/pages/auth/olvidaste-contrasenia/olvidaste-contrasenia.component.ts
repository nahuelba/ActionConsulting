import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-olvidaste-contrasenia',
  templateUrl: './olvidaste-contrasenia.component.html',
  styleUrls: ['./olvidaste-contrasenia.component.css']
})
export class OlvidasteContraseniaComponent implements OnInit {

  error=""

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  constructor(
    private authService: AuthService, 
    private Router:Router, 
    private afAuth: AngularFireAuth,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private titleService: Title ) {

      
    }
    
    ngOnInit(): void {
      this.titleService.setTitle('Recuperar Contraseña | ACTION HUMAN CAPITAL CONSULTING');
  }

  recuperarContrasenia(){
    if(this.loginForm.valid){

      this.authService.RecoverPassword(this.loginForm.value.email)
      .then(
        data =>{ 
          // console.log(data)
          this.toastr.success('Mail enviado. Revisa tu correo.')
          this.Router.navigate(['/auth/mail-enviado/' + this.loginForm.value.email])
        },
        err => {
          // this.toastr.error()
          switch(err.code){
            case 'auth/user-not-found':
              this.error= "No hay un usuario con este email. Verifica si el email esta escrito correctamente."
              break;
          }
          console.log(err)
        }
      )
    }else{
      this.error = "El email no es valido."
    }

  }

}
