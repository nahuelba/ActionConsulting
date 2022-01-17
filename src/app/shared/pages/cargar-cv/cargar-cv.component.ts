import { Component, OnInit } from '@angular/core';
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

  cvCargado = false;
  errorCV = false;
  pdf:any

  user:any

  constructor(
    private AuthService:AuthService, 
    private spinner:NgxSpinnerService, 
    private SubirCvService: SubirCvService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
 
   
    this.AuthService.getUserAfsSinId().subscribe(
      (user:any) => {
        console.log(user)
        this.user=user
      })
      }

  onFileChange(e: any) {
    console.log(e.files.item(0));
    if (e.files.item(0)) {
      if (e.files.item(0).type == 'application/pdf' || e.files.item(0).type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || e.files.item(0).type=="application/msword") {
        this.pdf = e.files.item(0)
        this.cvCargado = true;
        this.errorCV = false;
      } else {
        this.cvCargado = false;
        this.errorCV = true;
      }
    } else {
      this.cvCargado = false;
      this.errorCV = false;
    }
  }

  subirCV(){
    if(!this.cvCargado){
      return;
    }
    this.spinner.show()
    
    debugger  
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
    const esconderSpinner = concat(from(this.SubirCvService.subirCV(nombre_cv, this.pdf, tipo_cv)), from(this.AuthService.updateCV(this.user.id, CV)))
    //subirlo al storage de firebase
    

    esconderSpinner.subscribe(data =>{
      console.log(data)
      this.spinner.hide()
      this.toastr.success('Se ha subido el CV con exito!')
    },
    err => this.toastr.warning('No se ha podido subir el CV, intente mas tarde.'))
      
  }

  descargarCV(){

    this.spinner.show()
    this.SubirCvService.ObtenerPDF(this.user.cv.nombre, this.user.cv.tipo)
    .subscribe(data => {
    
      console.log(data)
      this.spinner.hide()
      window.open(data, "_blank")
      
    },
    (err: any) => {
      if(err.code == 'storage/object-not-found'){
        this.AuthService.updateCV(this.user.id, null)
        .then(data => {
          this.spinner.hide()
          this.toastr.warning('No se ha podido encontrar el CV en la base de datos, intente subirlo de nuevo.')
        })
      }else{
        this.spinner.hide()
        this.toastr.warning('No se ha podido descargar el CV. Intente mas tarde.')
      }
    })

  }
  EliminarCV(){
    this.spinner.show()
    concat(from(this.SubirCvService.deleteDocument(this.user.cv.nombre, this.user.cv.tipo)), from(this.AuthService.updateCV(this.user.id, null)))
    .subscribe(data => {
      console.log(data)
      this.spinner.hide()
      this.toastr.success('Se ha eliminado el CV con exito!')
    },
    err => this.toastr.warning('No se pudo eliminar el CV, intente mas tarde.'))

  }
}
