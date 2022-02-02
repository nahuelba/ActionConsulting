import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json'
import idiomas from 'src/assets/Opciones/idiomas.json'
import puestos from 'src/assets/Opciones/trabajos/puestos.json'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var $:any;
@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

  
  paises = paises

  idiomas = idiomas

  puestos = puestos

  provincias: Provincia[] = [];

  user:any;

  buscarForm = this.fb.group({
    puesto:['', Validators.required],
    pais:[''],
    provincia:[''],
    ciudad:[''],
    idioma1:[''],
    idioma2:[''],
    movilidad:['']
  }) 
  
  constructor(
    private fb:FormBuilder,
    private UbicacionesService:UbicacionesService,
    private router:Router,
    private authService:AuthService
    ) { }



  ngOnInit(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 100);
   
  }

  setProvincias(e:any){
    this.buscarForm.controls.provincia.setValue(null);

    if (e.target.value) {
      this.UbicacionesService.getProvincias(e.target.value).subscribe(
        (data: pais) => {
          this.provincias = data.provincias;
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
          }, 100);
        }
        );
    }

    
  }


  setCiudad(){
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 100);
    console.log(this.buscarForm.value.provincia)
  
  }

  buscar(){
    console.log(this.buscarForm.value)
    if(this.buscarForm.valid){
      const {puesto, idioma1, idioma2, pais, provincia, ciudad} = this.buscarForm.value


      const provinciaQ = (provincia ? provincia['provincia'] : "")
      

      

      this.router.navigate([`/empresa/buscar-usuarios/${puesto}`], { queryParams: { idioma1, idioma2, pais, provinciaQ, ciudad }})
    }
  }

}
