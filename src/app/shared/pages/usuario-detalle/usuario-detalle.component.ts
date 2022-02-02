import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { experiencia_laboral } from 'src/app/interfaces/experiencia.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaUsuariosService } from 'src/app/services/busqueda-usuarios.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';
import { SubirCvService } from 'src/app/services/subir-cv.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json'


@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() admin = false

  user:any
  cvs:any
  experiencias_laborales: any[] = []
  formaciones : any[] = []

  categorias = categorias
  id:string = ""

  formPerfil = new FormGroup({
    categoria: new FormControl(''),
    puesto: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    licencia:new FormControl(false),
    movilidad: new FormControl(false),
    discapacidad: new FormControl(false),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    email:new FormControl(''),
    emailalternativo: new FormControl(''),
    telefono1: new FormControl(''),
    telefono2: new FormControl('')
    
  })

  constructor(
    private AuthService:AuthService, 
    private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router,
    private MiPerfilService:MiPerfilService,
    private subirCVService:SubirCvService,
    private BusquedaUsuarios:BusquedaUsuariosService
    ) { }

  ngOnInit(): void {
    


    this.id =  this.activatedRoute.snapshot.paramMap.get('id') || "";
    if(!this.admin){
      this.AuthService.getUserLogged()
      .subscribe(user => {
        this.user = user
        this.BusquedaUsuarios.almacenarUsuarioRevelado(user?.uid || "", this.id)
      })

    }

    this.AuthService.getUserConId(this.id || "")
    .subscribe((user:any) =>{ 

      console.log(user)
      this.formPerfil.patchValue(user)
    
      if(user.fecha_nacimiento){
        
        this.formPerfil.controls.fecha_nacimiento.setValue(`${user.fecha_nacimiento.day}/${user.fecha_nacimiento.month}/${user.fecha_nacimiento.year}`)
      }

      //Set categoria
      let categoria =this.categorias.find(categoria => categoria.categoria == user.categoria)

      this.formPerfil.controls.categoria.setValue(categoria)

      
      // this.formPerfil.controls.licencia.disable();
      // console.log(this.formPerfil.controls.licencia.value)

      // this.formPerfil.controls.movilidad.disable();
  
      // this.formPerfil.controls.discapacidad.disable();
      
      this.MiPerfilService.leerExperienciasLaborales(this.user.id)
      .subscribe(experiencias => {
        this.experiencias_laborales = experiencias
      })
      this.MiPerfilService.leerFormacion(this.user.id)
      .subscribe(formaciones => {
        this.formaciones = formaciones
      })

      //CV
      this.subirCVService.obtenerCVSconId(this.user.id, user?.email || "")
      .subscribe(cvs => {
        console.log(cvs)
        if(cvs){
          this.cvs = cvs

        }
      })
    })


  }

 

  guardar(){
    this.spinner.show()
    debugger
    if(this.admin){
      
      const {categoria, usuarios, avisos} = this.formPerfil.value.categoria
      this.AuthService.updateUser(this.id, {categoria, usuarios, avisos})
      .then( data => {
        this.spinner.hide()
        this.router.navigate(['/empresa/admin/usuarios'])
        this.toastr.success('Se ha actualizado el perfil.')
  
      }, err => {
        this.spinner.hide()
        this.toastr.error('Hubo un error al guardar el perfil, intenta más tarde.')
      })
    }
  }

}
