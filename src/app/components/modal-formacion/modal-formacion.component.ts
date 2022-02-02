import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json'
import meses from 'src/assets/Opciones/meses.json'
import { pais, Provincia } from 'src/app/interfaces/pais';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formacion } from 'src/app/interfaces/formacion.interface';

declare var $: any;
@Component({
  selector: 'app-modal-formacion',
  templateUrl: './modal-formacion.component.html',
  styleUrls: ['./modal-formacion.component.css']
})
export class ModalFormacionComponent implements OnInit {

  @Input() formacion!:formacion;
  @ViewChild('actualidad')actualidad! :ElementRef;

  paises = paises

  meses = meses

  provincias: Provincia[] = [];
  ciudades: string[] = []

  anios: number[] = []

  metodo:string = ""

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
    otros_conocimientos: new FormControl('', Validators.required)
  })

  constructor(
    private UbicacionesService: UbicacionesService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.formacion)
    this.formacion ? this.metodo="Editar" : this.metodo="Agregar"
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
   }, 1000);

   if(this.formacion){
    this.formacionForm.patchValue(this.formacion)
    //Trabajo en la actualidad
    if(!this.formacion.fecha_fin){
      let e = {
        target: {
          checked: true
        }
      }
      this.trabajoActualmente(e)
    }
    this.UbicacionesService.getProvincias(this.formacionForm.value.pais)
    .subscribe(
      (data: pais) => {
        this.provincias = data.provincias;



        this.elegirProvincia()
      } 
    );
    }

     //Get Array of years
     var anio_actual = new Date().getFullYear() + 1
     for (let anio_inicio = 1950; anio_inicio < anio_actual; anio_inicio++) {
       this.anios.push(anio_inicio)
     }
  } 

  ngAfterViewInit(){
    if(this.formacion && !this.formacion.fecha_fin){
      this.actualidad.nativeElement.checked = true
    }

    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
   }, 1000);
  }

  elegirPais(){
    
    if(this.formacionForm.value.pais==""){
      this.formacionForm.value.provincia = ""
      this.formacionForm.value.ciudad = ""
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
      }, 50);
      return;
    }
    this.UbicacionesService.getProvincias(this.formacionForm.value.pais)
    .subscribe(
      (data: pais) => {
        this.provincias = data.provincias;
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
        }, 50);
      }
      );
  }

  elegirProvincia(){
    this.provincias.find(provincia => {
      if(provincia.provincia==this.formacionForm.value.provincia){
        this.ciudades= provincia.ciudades
      }
    })
     //Error Ngfor y Selectpicker
     setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);
  }

  trabajoActualmente(e:any){
    if(e.target.checked){
      this.formacionForm.controls.fecha_fin.setValue({
        mes: "",
      year: ""
      })
      $("#mes_fecha_fin").attr('disabled',true);
      $("#anio_fecha_fin").attr('disabled',true);

      $('.selectpicker').selectpicker('refresh');
      this.formacionForm.controls.fecha_fin.disable()
      
    }else{
      $("#mes_fecha_fin").attr('disabled',false);
      $("#anio_fecha_fin").attr('disabled',false);

      $('.selectpicker').selectpicker('refresh');
      this.formacionForm.controls.fecha_fin.enable()

    }
  }

  enviarForm(){
    if(this.formacionForm.valid){
      //  console.log(this.experienciaLaboralForm.value)
       
       this.activeModal.close(this.formacionForm.value)
      
    }

    
  }

}
