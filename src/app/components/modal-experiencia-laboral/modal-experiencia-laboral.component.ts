import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';

import paises from 'src/assets/Opciones/ubicaciones.json'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { experiencia_laboral } from 'src/app/interfaces/experiencia.interface';
import meses from 'src/assets/Opciones/meses.json'

@Component({
  selector: 'app-modal-experiencia-laboral',
  templateUrl: './modal-experiencia-laboral.component.html',
  styleUrls: ['./modal-experiencia-laboral.component.css']
})
export class ModalExperienciaLaboralComponent implements OnInit {


  @Input() experiencia!:experiencia_laboral



  // @ViewChild('PeriodoLaboral')PeriodoLaboral!: PeriodoLaboralFormacionComponent;


  meses = meses

  paises = paises


  

  provincias: Provincia[] = [];
  ciudades: string[] = []



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
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.experiencia ? this.metodo="Editar" : this.metodo="Agregar"
    console.log(this.experiencia)

    if(this.experiencia){
      this.experienciaLaboralForm.patchValue(this.experiencia)
      this.experienciaLaboralForm.controls.puesto.setValue(this.experiencia.puesto)
      //Trabajo en la actualidad
      if(!this.experiencia.fecha_fin){
        console.log('fecha fin')
        let e = {
          target: {
            checked: true
          }
        }
        // this.PeriodoLaboral.trabajoActualmente(e)
        // this.trabajoActualmente(e)
      }
      // this.experienciaLaboralForm.controls.ciudad.setValue(this.experiencia.ciudad)
      

    }

    
  }
  ngAfterViewInit(){
    if(this.experiencia && !this.experiencia.fecha_fin){
      // this.PeriodoLaboral.act = true;

    }
  }

  enviarForm(){

    if(this.experienciaLaboralForm.valid){
      //  console.log(this.experienciaLaboralForm.value)

      if(this.experienciaLaboralForm.value.fecha_fin){
        //validar si año de inicio es menor al fin
        if(parseInt(this.experienciaLaboralForm.value.fecha_inicio.year) > parseInt(this.experienciaLaboralForm.value.fecha_fin.year)){
          console.log('es mayor')
          return;
        }
        
        //validar mes si son iguales los años
        if(parseInt(this.experienciaLaboralForm.value.fecha_inicio.year) == parseInt(this.experienciaLaboralForm.value.fecha_fin.year)){
          // const mes_inicio_index = this.meses.indexOf({"nombre" : this.experienciaLaboralForm.value.fecha_inicio.mes})
          const mes_inicio_index = this.meses.findIndex( mes => mes.nombre == this.experienciaLaboralForm.value.fecha_inicio.mes);
          const mes_fin_index = this.meses.findIndex( mes => mes.nombre == this.experienciaLaboralForm.value.fecha_fin.mes);

          if(mes_inicio_index>=mes_fin_index){
            return;
          }
        } 
        
      }
    
      
      
      this.activeModal.close(this.experienciaLaboralForm.value)
      
    }

    
  }

}
