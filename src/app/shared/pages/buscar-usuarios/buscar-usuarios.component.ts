import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pais, Provincia } from 'src/app/interfaces/pais';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import paises from 'src/assets/Opciones/ubicaciones.json'
import idiomas from 'src/assets/Opciones/idiomas.json'
import puestos from 'src/assets/Opciones/trabajos/puestos.json'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { validateAllFormFields } from 'src/app/helpers';

declare var $:any;
@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.component.html',
  styleUrls: ['./buscar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

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
  }

  buscar(){
    console.log(this.buscarForm.value)

    validateAllFormFields(this.buscarForm)
    
    if(this.buscarForm.valid){
      const {puesto, idioma1, idioma2, pais, provincia, ciudad} = this.buscarForm.value


      const provinciaQ = (provincia ? provincia['provincia'] : "")
      

      

      this.router.navigate([`/empresa/buscar-usuarios/${puesto}`], { queryParams: { idioma1, idioma2, pais, provinciaQ, ciudad }})
    }
  }

}
