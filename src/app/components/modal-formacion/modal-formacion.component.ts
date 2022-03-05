import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formacion } from 'src/app/interfaces/formacion.interface';
import { ValidarPeriodo, validateAllFormFields } from 'src/app/helpers';
import meses from 'src/assets/Opciones/meses.json'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-formacion',
  templateUrl: './modal-formacion.component.html',
  styleUrls: ['./modal-formacion.component.css']
})
export class ModalFormacionComponent implements OnInit {

  @Input() formacion!:formacion;

  actualidad:boolean = false;

  metodo:string = ""

  meses = meses 

  lugar:any 

  formacionForm = new FormGroup({
    titulo: new FormControl('',Validators.required),
    tipo_estudio: new FormControl('', Validators.required),
    area_estudio: new FormControl('', Validators.required),
    pais: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    fecha_inicio: new FormGroup({
      mes: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required)
    }),
    fecha_fin : new FormGroup({
      mes: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required)
    }),
    otros_conocimientos: new FormControl('')
  })

  constructor(
    private UbicacionesService: UbicacionesService,
    public activeModal: NgbActiveModal,
    private toastr:ToastrService

    ) { }

  ngOnInit(): void {
    console.log(this.formacion)
    this.formacion ? this.metodo="Editar" : this.metodo="Agregar"

   if(this.formacion){
    this.formacionForm.patchValue(this.formacion)
    //formar lugar
    this.lugar = {
      pais: this.formacion.pais,
      provincia:this.formacion.provincia,
      ciudad:this.formacion.ciudad
    }


    //Trabajo en la actualidad
    if(!this.formacion.fecha_fin){
      this.actualidad =true;
    }

    }

  } 

  enviarForm(){

    validateAllFormFields(this.formacionForm)
    if(this.formacionForm.valid){
      //  console.log(this.experienciaLaboralForm.value)
       

      if(!ValidarPeriodo(this.formacionForm.value.fecha_fin, this.formacionForm.value.fecha_inicio, this.meses)){
        this.toastr.error('La fecha de finalización no puede ser igual o menor que la de inicio.')
        return;
      }
       this.activeModal.close(this.formacionForm.value)
      
    }

    
  }

}
