import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalEliminarFormacionComponent } from 'src/app/components/modal-eliminar-formacion/modal-eliminar-formacion.component';
import { ModalFormacionComponent } from 'src/app/components/modal-formacion/modal-formacion.component';
import { formacion } from 'src/app/interfaces/formacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  user:any

  formaciones:formacion[] = []
  constructor(
    private modalService: NgbModal,
    private MiPerfilService:MiPerfilService,
    private AuthService:AuthService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Formación | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) => {
      this.user = user
      this.MiPerfilService.leerFormacion(user.id)
    .subscribe((formaciones:any[]) => this.formaciones = formaciones)
    })
  }

  openModalFormacion(){
    this.modalService.open(ModalFormacionComponent, { size: 'lg' })
    .result.then((result) => {
      console.log(result)
      this.MiPerfilService.agregarFormacion(this.user.id, result)
      .then(data => {
        this.spinner.hide()
        this.toastr.success('Experiencia Laboral eliminada con exito')
        
      },err => {
        this.spinner.hide()
        this.toastr.success('Hubo un error al eliminar la experiencia, intenta mas tarde.')
      })
    }, ()=> console.log('cerrado'));
  }


  editarFormacion(id:string | undefined){
    const modalRef = this.modalService.open(ModalFormacionComponent, { size: 'lg' })

    modalRef.componentInstance.formacion = this.formaciones.find(formacion => formacion.id==id);

    modalRef.result.then((result) =>{
      this.spinner.show()
      this.MiPerfilService.updateFormacion(this.user.id, id!, result)
      .then(data => {
        this.spinner.hide()
        this.toastr.success('Experiencia Laboral editada con exito')
        
      },err => {
        this.spinner.hide()
        this.toastr.success('Hubo un error al editar la experiencia, intenta mas tarde.')
      })
  
    }, ()=> console.log('cerrado'));

  }

  eliminarFormacion(id:string | undefined){
    const modalRef =  this.modalService.open(ModalEliminarFormacionComponent)

    modalRef.componentInstance.formacion = this.formaciones.find(formacion => formacion.id==id)

    modalRef.result.then((result) => {
      console.log(result)
      if(result){
        this.spinner.show()
        this.MiPerfilService.eliminarFormacion(this.user.id, id!)
        .then(data => {
          this.spinner.hide()
          this.toastr.success('Formación eliminada con exito')
          
        },err => {
          this.spinner.hide()
          this.toastr.success('Hubo un error al eliminar la Formación, intenta mas tarde.')
        })
      }
    })
  }

}
