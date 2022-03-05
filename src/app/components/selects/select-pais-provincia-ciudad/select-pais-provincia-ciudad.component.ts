import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { pais, Provincia } from 'src/app/interfaces/pais';
import paises from 'src/assets/Opciones/ubicaciones.json';

@Component({
  selector: 'app-select-pais-provincia-ciudad',
  templateUrl: './select-pais-provincia-ciudad.component.html',
  styleUrls: ['./select-pais-provincia-ciudad.component.css'],
})
export class SelectPaisProvinciaCiudadComponent implements OnInit {
  paises: string[] = paises;
  provincias: Provincia[] = [];
  ciudades: string[] = [];

  constructor(private UbicacionesService: UbicacionesService) {}

  @Input() formGroup!: FormGroup;
  @Input() user:any
  @Input() obligatorio:boolean = false;


  ngOnInit(): void {
  }
  ngOnChanges(){
    this.elegirPais();

  }

  elegirPais() {
    this.formGroup.controls.provincia.setValue('');
    this.formGroup.controls.ciudad.setValue('');

    if (!this.formGroup.value.pais) {
      return;
    }
    this.UbicacionesService.getProvincias(( this.formGroup.value.pais )).subscribe(
      (data: pais) => {
        this.provincias = data.provincias;
        if(this.user?.provincia){
          this.formGroup.controls.provincia.setValue(this.user.provincia)
          this.elegirProvincia({provincia:this.user.provincia})
        }
      }
    );
  }

  elegirProvincia(e: any) {
    this.formGroup.controls.ciudad.setValue('');
    if(!this.formGroup.value.provincia){
      return;
    }
    this.formGroup.controls.provincia.setValue(e.provincia);
    this.provincias.find((provincia) => {
      if (provincia.provincia == this.formGroup.value.provincia) {
        this.ciudades = provincia.ciudades;
      }
    });


    if(this.user?.ciudad){
      this.formGroup.controls.ciudad.setValue(this.user.ciudad)
    }
  }
}
