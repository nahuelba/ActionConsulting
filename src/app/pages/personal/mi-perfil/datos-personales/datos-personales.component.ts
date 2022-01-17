import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json';

 @Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}


declare var $: any;
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class DatosPersonalesComponent implements OnInit {


  

  paises: string[] = paises;

  provincias: Provincia[] = [];

  ciudades: string[] = []


  datosPersonales = new FormGroup({
    nombre:new FormControl(''),
    pais:new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    licencia: new FormControl(false),
    movilidad: new FormControl(false),
    discapacidad: new FormControl(false)

  });


  constructor(private UbicacionesService: UbicacionesService) { }

  ngOnInit(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);

    this.datosPersonales.addControl("fecha_nacimiento", new FormControl('')) 
  }

  
  elegirPais(){
    
    if(this.datosPersonales.value.pais==""){
      this.datosPersonales.value.provincia = ""
      this.datosPersonales.value.ciudad = ""
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
      }, 50);
      return;
    }
    this.UbicacionesService.getProvincias(this.datosPersonales.value.pais)
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
      if(provincia.provincia==this.datosPersonales.value.provincia){
        this.ciudades= provincia.ciudades
      }
    })
     //Error Ngfor y Selectpicker
     setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);
  }

}
