import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit {

  user:any

  datosContactoForm = new FormGroup({
    email: new FormControl(''),
    emailalternativo: new FormControl(''),
    telefono1: new FormControl(''),
    telefono2: new FormControl('')

  })

  constructor(
    private AuthService:AuthService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Datos de Contacto | ACTION HUMAN CAPITAL CONSULTING');

    combineLatest([this.AuthService.getUserLogged(), this.AuthService.getUserAfsSinId()])
    .subscribe(([user, userData]:any) => {
      // console.log(user)
      this.user = user
      this.datosContactoForm.controls.email.setValue(user.email)
      this.datosContactoForm.controls.emailalternativo.setValue(userData.emailalternativo)
      this.datosContactoForm.controls.telefono1.setValue(userData.telefono1)
      this.datosContactoForm.controls.telefono2.setValue(userData.telefono2)

    
      // console.log(userData)
    })
  }

  GuardarPerfil(){
    this.spinner.show()
    delete this.datosContactoForm.value.email

    console.log(this.datosContactoForm.value)

    this.AuthService.updateUser(this.user.uid, this.datosContactoForm.value)
    .then(data =>{
      this.toastr.success('Perfil actualizado con exito!')
      this.spinner.hide()
    },
     err => {
       this.toastr.error('No se pudo actualizar el perfil, intente mas tarde.')
       this.spinner.hide()
     }
    )
  }
}
