import { Component, OnInit } from '@angular/core';
import { pais, Provincia } from 'src/app/interfaces/pais';

import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalExperienciaLaboralComponent } from 'src/app/components/modal-experiencia-laboral/modal-experiencia-laboral.component';
import { experiencia_laboral } from 'src/app/interfaces/experiencia.interface';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';
import { ModalEliminarExperienciaComponent } from 'src/app/components/modal-eliminar-experiencia/modal-eliminar-experiencia.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {


  user:any
  
  experiencias_laborales:experiencia_laboral[] = []

  
  constructor(
    private AuthService:AuthService,
    private MiPerfilService:MiPerfilService,
    private modalService: NgbModal,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    config: NgbModalConfig,
    private titleService: Title
    ) { 
      config.backdrop = 'static';
    config.keyboard = false;

    }

  ngOnInit(): void {    
    this.titleService.setTitle('Experiencia Laboral | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) => {
      this.user = user
      this.MiPerfilService.leerExperienciasLaborales(user.id)
    .subscribe((experiencias_laboral:any[]) => this.experiencias_laborales = experiencias_laboral)
    })
  }

 

  
  openModalExperiencia(){
    this.modalService.open(ModalExperienciaLaboralComponent, { size: 'lg' }).result
    .then((result) => {
      this.AgregarExperiencia(result);
      console.log(result);
    }, ()=> console.log('cerrado'));
  }
  

  AgregarExperiencia(experiencia_laboral:experiencia_laboral){
  
      this.spinner.show()

      this.MiPerfilService.agregarExperienciaLaboral(this.user.id,experiencia_laboral)
      .then(data => {
        this.spinner.hide()
        this.toastr.success('Experiencia Laboral agregada con exito')
        
      },err => {
        this.spinner.hide()
        this.toastr.success('Hubo un error al agregar la experiencia, intenta mas tarde.')
      })
  
  }


  editarExperiencia(id:string | undefined){
    
    console.log(id)
    const modalRef = this.modalService.open(ModalExperienciaLaboralComponent, { size: 'lg' })

    modalRef.componentInstance.experiencia = this.experiencias_laborales.find(experiencia => experiencia.id==id);

    modalRef.result.then((result) =>{
      this.spinner.show()
      this.MiPerfilService.updateExperiencia(this.user.id, id!, result)
      .then(data => {
        this.spinner.hide()
        this.toastr.success('Experiencia Laboral editada con exito')
        
      },err => {
        this.spinner.hide()
        this.toastr.success('Hubo un error al editar la experiencia, intenta mas tarde.')
      })
  
    }, ()=> console.log('cerrado'));

  }

  eliminarExperiencia(id:string | undefined){
    const modalRef =  this.modalService.open(ModalEliminarExperienciaComponent)

    modalRef.componentInstance.experiencia = this.experiencias_laborales.find(experiencia => experiencia.id==id)

    modalRef.result.then((result) => {
      console.log(result)
      if(result){
        this.spinner.show()
        this.MiPerfilService.eliminarExperiencia(this.user.id, id!)
        .then(data => {
          this.spinner.hide()
          this.toastr.success('Experiencia Laboral eliminada con exito')
          
        },err => {
          this.spinner.hide()
          this.toastr.success('Hubo un error al eliminar la experiencia, intenta mas tarde.')
        })
      }
    })
  }

}
