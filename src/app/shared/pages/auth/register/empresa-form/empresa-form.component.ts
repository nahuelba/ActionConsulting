import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  tipo!:string
  error = '';

  errorArchivo = false;
  fotoPerfil:any
  // fileToUpload: File | null = null;
  registerForm = new FormGroup({
    tipo: new FormControl('empresa'),
    nombre: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  // @ViewChild('labelImport') labelImport: ElementRef;

  constructor(private authService: AuthService, private router: Router, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
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
              nombre:nombre, 
              admin: false
            }

          this.authService.saveUser(userNuevo, res.user.uid)
          .then((data:any) => {
            
            this.spinner.hide()
            
          })
          this.authService.verifyEmail(res.user)
          this.router.navigate([this.tipo +'/auth/register/verificar-email']);
        });
      }
    } else {
      this.error = 'Las contraseñas no coinciden';
      this.spinner.hide()
    }
  }

}
