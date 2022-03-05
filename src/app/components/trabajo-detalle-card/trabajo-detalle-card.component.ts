import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { job } from 'src/app/interfaces/card.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { DiasRestantesService } from 'src/app/services/dias-restantes.service';

import categorias from 'src/assets/Opciones/trabajos/categorias.json'
import estados from 'src/assets/Opciones/trabajos/estados.json'

@Component({
  selector: 'app-trabajo-detalle-card',
  templateUrl: './trabajo-detalle-card.component.html',
  styleUrls: ['./trabajo-detalle-card.component.css']
})
export class TrabajoDetalleCardComponent implements OnInit {


  categorias:any = categorias

  estados:any = estados

  user:any

  @Input() job!:job;
  @Input() empresa:boolean = false;
  @Input() admin:boolean = false;

  select = new FormGroup({

    estado :new FormControl(''),
    destacado: new FormControl(false),
    categoria: new FormControl('')
  })



  constructor(
    private CardService:CardService, 
    private router:Router,
    private spinner: NgxSpinnerService,
    public diasRestantesService:DiasRestantesService,
    private toastr:ToastrService,
    private AuthService:AuthService
    ) { }

  ngOnInit(): void {

    this.AuthService.getUserAfsSinId()
    .subscribe(user => this.user = user)
  }
  ngOnChanges(){
    if(this.job){
      this.select.controls.estado.setValue(this.job.estado)

      this.select.controls.destacado.setValue(this.job.destacado)

      this.diasRestantesService.calcularDiasRestantes(this.job)

    }
  }

  cambiarEstado(){

    this.spinner.show()
    if(this.job.estado=="Finalizado" && (this.select.value.estado=="Publicado" || this.select.value.estado=="Pendiente")){

      this.CardService.actualizarTrabajo(this.job.id, {estado : this.select.value.estado, fecha_publicacion:new Date(), destacado:this.select.value.destacado, categoria:this.select.value.categoria})
      .then( data => {
        this.spinner.hide()
        this.toastr.success('Se ha cambiado el estado de la publicación.')
      },
      err => this.toastr.warning('No se ha podido cambiar el estado, intente mas tarde.'))
    }else{
      this.CardService.actualizarTrabajo(this.job.id, {estado : this.select.value.estado, destacado:this.select.value.destacado, categoria:this.select.value.categoria})
      .then( data => {
        this.spinner.hide()
        this.toastr.success('Se ha cambiado el estado de la publicación.')
      },
      err => this.toastr.warning('No se ha podido cambiar el estado, intente mas tarde.'))
    }
  }


  eliminarTrabajo(){
    this.spinner.show()
    this.CardService.eliminarTrabajo(this.job.id)
    .then(data =>{
      this.spinner.hide()
      this.router.navigate(['/admin'])
      this.toastr.success('Se ha eliminado el Aviso con exito!')
    },
    err => {
      this.spinner.hide()
      this.toastr.warning('No se ha podido eliminar el Aviso, intente mas tarde.')
  }
    )
  }

}
