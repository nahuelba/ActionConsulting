import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { experiencia_laboral } from 'src/app/interfaces/experiencia.interface';
import meses from 'src/assets/Opciones/meses.json'
import { ValidarPeriodo, validateAllFormFields } from 'src/app/helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-experiencia-laboral',
  templateUrl: './modal-experiencia-laboral.component.html',
  styleUrls: ['./modal-experiencia-laboral.component.css']
})
export class ModalExperienciaLaboralComponent implements OnInit {


  @Input() experiencia!:experiencia_laboral



  // @ViewChild('PeriodoLaboral')PeriodoLaboral!: PeriodoLaboralFormacionComponent;


  meses = meses
  actualidad:boolean = false;
  lugar:any
  metodo:string = ""

  experienciaLaboralForm = new FormGroup({
    puesto: new FormControl('',Validators.required),
    rubro: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),
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
    principales_responsabilidades: new FormControl('', Validators.required)
  })

  constructor(
    private UbicacionesService: UbicacionesService,
    public activeModal: NgbActiveModal,
    private toastr:ToastrService) {}

  ngOnInit(): void {
    this.experiencia ? this.metodo="Editar" : this.metodo="Agregar"
    console.log(this.experiencia)

    if(this.experiencia){
      this.experienciaLaboralForm.patchValue(this.experiencia)
      this.experienciaLaboralForm.controls.puesto.setValue(this.experiencia.puesto)

      this.lugar = {
        pais:this.experiencia.pais,
        provincia:this.experiencia.provincia,
        ciudad:this.experiencia.ciudad
      }
      //Trabajo en la actualidad
      if(!this.experiencia.fecha_fin){
        console.log('fecha fin')
        this.actualidad=true;

      }
      

    }

    
  }
 

  enviarForm(){

    validateAllFormFields(this.experienciaLaboralForm)

    if(this.experienciaLaboralForm.valid){
      //  console.log(this.experienciaLaboralForm.value)

      
      
      
      if(!ValidarPeriodo(this.experienciaLaboralForm.value.fecha_fin, this.experienciaLaboralForm.value.fecha_inicio, this.meses)){
        this.toastr.error('La fecha de finalización no puede ser igual o menor que la de inicio.')
        return;
      }
    
      
      
      this.activeModal.close(this.experienciaLaboralForm.value)
      
    }

    
  }

}
