import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { validateAllFormFields } from 'src/app/helpers';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent implements OnInit {

  categoria = ""
  user:any

  miPerfilForm = new FormGroup({
    nombre: new FormControl('')
  })

  constructor(
    private AuthService:AuthService,
    private titleService: Title,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Datos de Empresa | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) =>{
      this.miPerfilForm.controls.nombre.setValue(user.nombre)
      this.categoria = user.categoria
      this.user =user
    })

  }


  GuardarPerfil(){
    validateAllFormFields(this.miPerfilForm)
    if(this.miPerfilForm.valid){

      this.spinner.show()
      Object.keys(this.miPerfilForm.value).forEach(key => {
        if (this.miPerfilForm.value[key] === undefined) {
          delete this.miPerfilForm.value[key];
        }
      });
      
      this.AuthService.updateUser(this.user.id || "", this.miPerfilForm.value )
      .then(data =>{
        this.toastr.success('Perfil actualizado con exito!')
        this.spinner.hide()
      },
      err => {
        this.toastr.error('No se pudo actualizar el perfil, intente mas tarde.')
        this.spinner.hide()
      })
    }
  }

}
