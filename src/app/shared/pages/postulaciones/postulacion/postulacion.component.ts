import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalRevelarConfirmacionComponent } from 'src/app/components/modal-revelar-confirmacion/modal-revelar-confirmacion.component';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaUsuariosService } from 'src/app/services/busqueda-usuarios.service';
import { LaunchModalPreciosService } from 'src/app/services/launch-modal-precios.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { SubirCvService } from 'src/app/services/subir-cv.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json'

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css']
})
export class PostulacionComponent implements OnInit {

  @Input() admin = false

  @Output() revelarNombre = new EventEmitter<any>();
  id_postulante:string = ""

  user:any
  cvs:any = {
    cvPostulado:"",
    cvs:[]
  }
  experiencias_laborales: any[] = []
  formaciones : any[] = []

  categorias = categorias
  id_empresa:string = ""
  id_trabajo:string = ""
  curriculums:any


  datosContacto:any

  formPerfil = new FormGroup({
    categoria: new FormControl(''),
    puesto: new FormControl(''),
    rubro: new FormControl(''),
    sueldo: new FormControl(''),
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
    telefono2: new FormControl(''),
    genero: new FormControl('')
    
  })

  constructor(
    private AuthService:AuthService, 
    private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router,
    private MiPerfilService:MiPerfilService,
    private subirCVService:SubirCvService,
    private BusquedaUsuarios:BusquedaUsuariosService,
    private modalService:NgbModal,
    private LaunchModal:LaunchModalPreciosService,
    private postulacionService:PostulacionService
    ) { 
           // force route reload whenever params change;
          //  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {

    
    this.activatedRoute?.parent?.params
    .subscribe(
      (params) => 
      { 
        this.id_trabajo = params.id
      });



    this.AuthService.getUserAfsSinId()
    .subscribe((data:any) => {
      console.log(data)
      this.curriculums = data.curriculums
      this.id_empresa = data.id
    })
    // if(!this.admin){
    //   this.AuthService.getUserLogged()
    //   .subscribe(user => {
    //     this.user = user
    //     this.BusquedaUsuarios.almacenarUsuarioRevelado(user?.uid || "", this.id)
    //   })

    // }
  }  

  obtenerDatosUsuario(idPostulante:string){
    this.id_postulante =idPostulante
    this.AuthService.getUserConId(idPostulante || "")
    .subscribe((user:any) =>{ 

      console.log(user)
      this.user = user
      this.formPerfil.patchValue(user)
    
      if(user.fecha_nacimiento){
        
        this.formPerfil.controls.fecha_nacimiento.setValue(`${user.fecha_nacimiento.day}/${user.fecha_nacimiento.month}/${user.fecha_nacimiento.year}`)
      }

      //Set categoria
      let categoria =this.categorias.find(categoria => categoria.categoria == user.categoria)

      this.formPerfil.controls.categoria.setValue(categoria)
      
      this.MiPerfilService.leerExperienciasLaborales(idPostulante)
      .subscribe(experiencias => {
        this.experiencias_laborales = experiencias
      })
      this.MiPerfilService.leerFormacion(idPostulante)
      .subscribe(formaciones => {
        this.formaciones = formaciones
      })


    })

  }
  
  revelarUsuario(){
    //si el usuario tiene  0 curriculums
    if(this.curriculums==0){
      this.LaunchModal.disparaModalPrecios()
      return;
    }
  

    const modalRef = this.modalService.open(ModalRevelarConfirmacionComponent)
    modalRef.componentInstance.CV = this.curriculums
    modalRef.result.then((result) => {
      if(result){
        this.spinner.show()
        console.log(result);

        this.leerDatosContacto()
        //restar 1 de curriculums
        from(this.AuthService.updateUser(this.id_empresa,{ curriculums :this.curriculums - 1})).pipe(take(1))

        // Guardar usuario revelado
        from(this.MiPerfilService.updateUserUsuariosRevelados(this.id_empresa,  this.id_postulante, {fecha_revelado: new Date()})).pipe(take(1))

      }
    }, ()=> console.log('cerrado'));

  }

  reiniciarUsuario(){
   this.formPerfil.reset()

    this.cvs ={
      cvPostulado:"",
      cvs:[]
    }

    this.datosContacto = ''
  }

  guardar(){
    this.spinner.show()
    debugger
    if(this.admin){
      
      const {categoria, usuarios, avisos} = this.formPerfil.value.categoria
      this.AuthService.updateUser(this.id_postulante, {categoria, usuarios, avisos})
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


  leerDatosContacto(){
    this.MiPerfilService.leerDatosContacto(this.id_postulante)
    .subscribe(datosContacto => {
      console.log(datosContacto)
      this.revelarNombre.emit({id: this.id_postulante, nombre: datosContacto[0].nombre})
      this.datosContacto = datosContacto[0]

      this.formPerfil.patchValue(datosContacto[0])

      //CV
      this.subirCVService.obtenerCVSconId(this.id_postulante, this.datosContacto.email || ""  )
      .subscribe((cvs:any) => {
        console.log(cvs)

        // Verificar si es pagina postulaciones o busqueda general
        if(this.id_trabajo){

          //Verificar cual cv es con el que se postulo
          this.postulacionService.getPostulacion(this.id_trabajo, this.id_postulante).pipe(take(1))
          .subscribe(cvPostulado => {
            this.cvs.cvs = []
            cvs.forEach((cv:any) => {
              if(cv.includes(cvPostulado[0]['cv'].nombre)){

                this.cvs['cvPostulado'] = cv
            }else{
              this.cvs.cvs.push(cv)
            }
          });
          console.log(this.cvs)
          this.spinner.hide()
         })
        }else{
          this.cvs.cvs = cvs
          this.spinner.hide()
        }
        
      })
    })
  }


}
