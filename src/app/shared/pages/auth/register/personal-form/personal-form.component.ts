import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { LaunchModalPreciosService } from 'src/app/services/launch-modal-precios.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';


@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {
  tipo!:string
  error = '';

  errorArchivo = false;
  fotoPerfil:any
  // fileToUpload: File | null = null;
  registerForm = new FormGroup({
    tipo: new FormControl('personal'),
    nombre: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  // @ViewChild('labelImport') labelImport: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private spinner:NgxSpinnerService,
    private titleService: Title,
    private MiPerfilService:MiPerfilService,
    private LaunchModalPreciosService: LaunchModalPreciosService
    ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Registrarse | ACTION HUMAN CAPITAL CONSULTING');

    if(this.router.url.includes('personal')){

      this.tipo = '/personal'

    }else if(this.router.url.includes('empresa')){
      this.tipo = '/empresa'
    }else{
      this.router.navigate(['/personal']);
    }
  }

  register() {
    this.spinner.show()
    console.log(this.registerForm.value);

    if (this.registerForm.value.password == this.registerForm.value.password2) {
      if (this.errorArchivo == false) {
        const { email, password, nombre } = this.registerForm.value;
        this.authService.register(email, password).then((res: any) => {
          console.log(res);
          if (res.code) {
            switch (res.code) {
              case 'auth/invalid-email':
                this.error = 'El Email es inválido.';
                break;

              case 'auth/weak-password':
                this.error =
                  'La contraseña debe tener una longitud de 6 o mas.';
                break;

              case 'auth/email-already-in-use':
                this.error = 'El email ya está en uso.';
                break;
            }
            this.spinner.hide()
            return;
          }

          // this.authService.subirFotoPerfil(res.user.uid, this.fotoPerfil)
          res.user.updateProfile({
            displayName: `${nombre}`,
          });

          const userNuevo = 
            {
              tipo: this.registerForm.value.tipo, 
              // nombre:nombre, 
              // email:email,
              admin: false,
              verificado:false
            }

          this.authService.saveUser(userNuevo, res.user.uid)
          .then((data:any) => {
            
            this.MiPerfilService.agregarDatosContacto(res.user.uid || "", {
              email:email,
              nombre:nombre,
              
            }).then(data => 
              this.spinner.hide()
              )
          })
          
          this.authService.verifyEmail(res.user)
          if( this.tipo === '/empresa'){
            this.router.navigate([ this.tipo + '/auth/register/verificar-email']);
          }else{
            this.LaunchModalPreciosService.toastRegistro()
            this.router.navigate([ this.tipo + '/mi-perfil/datos-personales']);

          }
        });
      }
    } else {
      this.error = 'Las contraseñas no coinciden';
      this.spinner.hide()
    }
  }

}
