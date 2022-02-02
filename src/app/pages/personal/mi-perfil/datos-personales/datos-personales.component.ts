import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';

import { pais, Provincia } from 'src/app/interfaces/pais';
import { user } from 'src/app/interfaces/user.interface'
import { AuthService } from 'src/app/services/auth.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Title } from '@angular/platform-browser';

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

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class DatosPersonalesComponent implements OnInit {


  
  provincias: Provincia[] = [];
  

  lugar:any

  ciudades: string[] = []
  fecha_nacimiento:any

  datosPersonales = new FormGroup({
    nombre:new FormControl(''),
    puesto:new FormControl(''),
    fecha_nacimiento: new FormControl(),
    pais:new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    licencia: new FormControl(false),
    movilidad: new FormControl(false),
    discapacidad: new FormControl(false)

  });

  user!:user


  constructor(
    private UbicacionesService: UbicacionesService, 
    private AuthService:AuthService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Datos Personales | ACTION HUMAN CAPITAL CONSULTING');


    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) => {
      this.user = user
      this.datosPersonales.controls.nombre.setValue(user.nombre)

      //puesto
      this.datosPersonales.controls.puesto.setValue(user.puesto)
      //Fecha nacimiento
      this.fecha_nacimiento = user.fecha_nacimiento
      this.datosPersonales.controls.fecha_nacimiento.setValue({...user.fecha_nacimiento})

      //pais
      this.datosPersonales.controls.pais.setValue(user.pais)
      this.lugar = {
        pais:user.pais,
        provincia:user.provincia,
        ciudad:user.ciudad,
      }

        this.datosPersonales.controls.licencia.setValue(user.licencia)
        this.datosPersonales.controls.movilidad.setValue(user.movilidad)
        this.datosPersonales.controls.discapacidad.setValue(user.discapacidad)
    })

    this.datosPersonales.addControl("fecha_nacimiento", new FormControl('')) 
  }

  GuardarPerfil(){
    this.spinner.show()
    this.datosPersonales.controls.fecha_nacimiento.setValue({...this.fecha_nacimiento})
    Object.keys(this.datosPersonales.value).forEach(key => {
      if (this.datosPersonales.value[key] === undefined) {
        delete this.datosPersonales.value[key];
      }
    });

    
    
    console.log(this.datosPersonales.value)
    this.AuthService.updateUser(this.user.id || "", this.datosPersonales.value )
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
