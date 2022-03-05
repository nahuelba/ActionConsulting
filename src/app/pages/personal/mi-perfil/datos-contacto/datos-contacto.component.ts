import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';

@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit {

  user:any

  id_datos_contacto = ""
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
    private titleService: Title,
    private MiPerfilService:MiPerfilService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Datos de Contacto | ACTION HUMAN CAPITAL CONSULTING');

    // combineLatest([this.AuthService.getUserLogged(), this.AuthService.getUserAfsSinId()])
    // .subscribe(([user, userData]:any) => {
    //   // console.log(user)
    //   this.user = user
    //   this.datosContactoForm.controls.email.setValue(user.email)
    //   this.datosContactoForm.controls.emailalternativo.setValue(userData.emailalternativo)
    //   this.datosContactoForm.controls.telefono1.setValue(userData.telefono1)
    //   this.datosContactoForm.controls.telefono2.setValue(userData.telefono2)

    
    //   // console.log(userData)
    // })

    this.AuthService.getUserLogged().pipe(
        concatMap((user:any)=>{ 
          if(user){
            this.user = user
            this.datosContactoForm.controls.email.setValue(user.email)
            return this.MiPerfilService.leerDatosContacto(this.user.uid)
  
          }else{
            return of(false)
          }
        })
      ).subscribe((data:any) =>{
        if(data.length>0){
          this.datosContactoForm.controls.emailalternativo.setValue(data[0].emailalternativo)
          this.datosContactoForm.controls.telefono1.setValue(data[0].telefono1)
          this.datosContactoForm.controls.telefono2.setValue(data[0].telefono2)
          
          this.id_datos_contacto = data[0].id
        }

      })
    
  }

  GuardarPerfil(){
    this.spinner.show()
    // delete this.datosContactoForm.value.email
    console.log(this.id_datos_contacto)
    console.log(this.datosContactoForm.value)

    if(this.id_datos_contacto){
      this.MiPerfilService.updateDatosContacto(this.user.uid, this.id_datos_contacto, this.datosContactoForm.value)
      .then(data =>{
        this.toastr.success('Perfil actualizado con exito!')
        this.spinner.hide()
      },
       err => {
         this.toastr.error('No se pudo actualizar el perfil, intente mas tarde.')
         this.spinner.hide()
       }
      )

    }else{
      this.MiPerfilService.agregarDatosContacto(this.user.uid, this.datosContactoForm.value)
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
}
