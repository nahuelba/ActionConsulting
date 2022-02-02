import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { concat, forkJoin, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { SubirCvService } from 'src/app/services/subir-cv.service';

@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCVComponent implements OnInit {

  @Output() CV = new EventEmitter<any>();

  @Input() seleccionarCV:boolean = true;

  cvCargado = false;
  errorCV = false;
  errorMismoNombre = false;
  pdf:any

  user:any

  agregarcv:boolean = false;

  user_email:string | null | undefined
  constructor(
    private AuthService:AuthService, 
    private spinner:NgxSpinnerService, 
    private SubirCvService: SubirCvService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
 
   
    this.AuthService.getUserAfsSinId().subscribe(
      (user:any) => {
        this.AuthService.obtenerCvs(user.id)
        .subscribe(Cvs => user['CVs'] = Cvs)
        this.user=user
        console.log(this.user)
      })

    this.AuthService.getUserLogged()
    .subscribe(user => this.user_email = user?.email)
  }

  onFileChange(e: any) {
    console.log(e.files.item(0));
    if (e.files.item(0)) {
      if (e.files.item(0).type == 'application/pdf' || e.files.item(0).type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || e.files.item(0).type=="application/msword") {
        this.user?.CVs.forEach((cv:any) => {
          console.log(cv)
          if(e.files.item(0).name.includes( cv.nombre)){
            this.errorMismoNombre=true;
          }
        });
       

        this.pdf = e.files.item(0)
        this.cvCargado = true;
        this.errorCV = false;
      } else {
        this.cvCargado = false;
        this.errorCV = true;
        this.errorMismoNombre=false;
      }
    } else {
      this.cvCargado = false;
      this.errorCV = false;
      this.errorMismoNombre=false;
    }
  }

  subirCV(){
    if(!this.cvCargado || this.errorMismoNombre){
      return;
    }
    this.spinner.show()
    
    var tipo_cv = ""
    //definir el tipo de documento a guardar
    switch(this.pdf.type){
      case 'application/pdf':
        var tipo_cv = ".pdf"
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        var tipo_cv = ".docx"
        break;
      case "application/msword":
        var tipo_cv = ".doc"
        break;
    }

    var nombre_cv =this.pdf.name.split(tipo_cv)[0].replaceAll(' ', '_');

    console.log(nombre_cv)
    console.log(tipo_cv)
    
    var CV = {
      nombre:nombre_cv,
      tipo:tipo_cv,
      fecha: new Date()
    }
    const esconderSpinner = concat(from(this.SubirCvService.subirCV(this.user_email || "", nombre_cv, this.pdf, tipo_cv)), from(this.AuthService.updateCV(this.user.id, CV)))
    //subirlo al storage de firebase
    

    esconderSpinner.subscribe(data =>{
      console.log(data)
      this.spinner.hide()
      this.toastr.success('Se ha subido el CV con exito!')
      this.agregarcv = false;
    },
    err => this.toastr.warning('No se ha podido subir el CV, intente mas tarde.'))
      
  }

  descargarCV(cv:string, tipo:string){

    this.spinner.show()
    this.SubirCvService.ObtenerPDF(this.user_email || "", cv, tipo)
    .subscribe(data => {
    
      console.log(data)
      this.spinner.hide()
      window.open(data, "_blank")
      
    },
    (err: any) => {
      if(err.code == 'storage/object-not-found'){
    
          this.spinner.hide()
          this.toastr.warning('No se ha podido encontrar el CV en la base de datos, intente subirlo de nuevo.')
       
      }else{
        this.spinner.hide()
        this.toastr.warning('No se ha podido descargar el CV. Intente mas tarde.')
      }
    })

  }
  EliminarCV(cv:string, tipo:string, id_cv:string){
    this.spinner.show()
    concat(from(this.SubirCvService.deleteDocument(this.user_email || "",cv, tipo)), from(this.AuthService.eliminarCV(this.user.id, id_cv)))
    .subscribe(data => {
      console.log(data)
      this.spinner.hide()
      this.toastr.success('Se ha eliminado el CV con exito!')
    },
    err => this.toastr.warning('No se pudo eliminar el CV, intente mas tarde.'))

  }



}
