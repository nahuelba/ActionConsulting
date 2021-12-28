import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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

  constructor(private authService: AuthService, private Router: Router) {}

  ngOnInit(): void {}

  register() {
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
            return;
          }

          // this.authService.subirFotoPerfil(res.user.uid, this.fotoPerfil)
          res.user.updateProfile({
            displayName: `${nombre}`,
          });

          this.authService.saveUser(res.user.uid, this.registerForm.value.tipo);

          this.Router.navigate([this.registerForm.value.tipo]);
        });
      }
    } else {
      this.error = 'Las contraseñas no coinciden';
    }
  }

  // checkFotoFormat(e: any) {
  //   console.log(e.files);
  //   if (e.files.item(0)) {
  //     if (
  //       e.files.item(0).type == 'image/jpeg' ||
  //       e.files.item(0).type == 'image/png'
  //     ) {
  //       this.errorArchivo = false;
  //       this.fotoPerfil = e.files.item(0)
  //     } else {
  //       this.errorArchivo = true;
  //     }
  //   }
  //   // this.fileToUpload = e.files.item(0)
  // }
}
