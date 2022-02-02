import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import meses from 'src/assets/Opciones/meses.json'


@Component({
  selector: 'app-periodo-laboral-formacion',
  templateUrl: './periodo-laboral-formacion.component.html',
  styleUrls: ['./periodo-laboral-formacion.component.css']
})
export class PeriodoLaboralFormacionComponent implements OnInit {

  @ViewChild('actualidad')actualidad! :ElementRef;  

  @Input() formGroup!:FormGroup

  act:boolean = false

  meses = meses
  meses_inicio = meses
  meses_fin = meses
  anios: number[] = []

  hoy:any

  constructor() { }

  ngOnInit(): void {
    this.hoy = new Date()
    //Get Array of years
    var anio_actual = new Date().getFullYear() + 1
    for (let anio_inicio = 1980; anio_inicio < anio_actual; anio_inicio++) {
      this.anios.unshift(anio_inicio)
    }

    this.anio_actual('inicio')
    this.anio_actual('fin')
  }

  ngAfterViewInit(){
    if(this.act){
      this.actualidad.nativeElement.checked = true
    }

 
  }


  trabajoActualmente(e:any){
    if(e.target.checked){
      this.formGroup.controls.fecha_fin.setValue({
        mes: "",
      year: ""
      })
      // $("#mes_fecha_fin").attr('disabled',true);
      // $("#anio_fecha_fin").attr('disabled',true);

  
      this.formGroup.controls.fecha_fin.disable()
      
    }else{
      // $("#mes_fecha_fin").attr('disabled',false);
      // $("#anio_fecha_fin").attr('disabled',false);


      this.formGroup.controls.fecha_fin.enable()

    }
  }


  anio_actual(tipo:string){
    if(tipo=="inicio"){
      if(this.formGroup.controls.fecha_inicio.value.year==this.hoy.getFullYear().toString()){

        this.formGroup.controls.fecha_inicio.setValue({
          mes:'',
          year:2022
        })
    
        for (let mes = 0; mes < this.meses_inicio.length; mes++) {
          if(this.meses_inicio[mes].nombre.toLowerCase()==this.hoy.toLocaleString('default', { month: 'long' }).toLowerCase()){

            const index = this.meses_inicio.indexOf(this.meses_inicio[mes]);

            const result = index < 0 ? [] : this.meses_inicio.slice(0, index + 1 );
            
            this.meses_inicio = result

     
            break;
          }
          
        }
      }else{
        this.meses_inicio = meses
 
      }
    }


    if(tipo=="fin"){
      if(this.formGroup.controls.fecha_fin.value.year==this.hoy.getFullYear().toString()){

        this.formGroup.controls.fecha_fin.setValue({
          mes:'',
          year:2022
        })
    
        for (let mes = 0; mes < this.meses_fin.length; mes++) {
          if(this.meses_fin[mes].nombre.toLowerCase()==this.hoy.toLocaleString('default', { month: 'long' }).toLowerCase()){

            const index = this.meses_fin.indexOf(this.meses_fin[mes]);

            const result = index < 0 ? [] : this.meses_fin.slice(0, index + 1 );
            
            this.meses_fin = result


            break;
          }
          
        }
      }else{
        this.meses_fin = meses

      }
    }

  }

}
