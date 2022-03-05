import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SubirCvService } from 'src/app/services/subir-cv.service';

@Component({
  selector: 'app-video-curriculum',
  templateUrl: './video-curriculum.component.html',
  styleUrls: ['./video-curriculum.component.css']
})
export class VideoCurriculumComponent implements OnInit {

  @Input() user_email:any
  @Input() user:any

  agregarvideoCV = false;

  errorFormato = false;

  ErrorvideoSize = false;

  video:any

  constructor(
    private AuthService:AuthService, 
    private spinner:NgxSpinnerService, 
    private SubirCvService: SubirCvService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    console.log(this.user)
  }

  checkVideoCurriculum(e:any){
    this.errorFormato = false;
    this.ErrorvideoSize = false;
    console.log(e.files.item(0));
    if (e.files.item(0)) {
      if (e.files.item(0).type == 'video/mp4' || e.files.item(0).type =="video/avi") {
        this.video = e.files.item(0)
      }else{
        this.errorFormato = true;
      }
      if(e.files.item(0).size > 10000000){
        this.ErrorvideoSize = true;
      }
      
    }
  }

  subirvideoCV(){
    if(this.errorFormato || this.ErrorvideoSize){
      return;
    }

    this.spinner.show()

    var tipo_cv = ""
    //definir el tipo de documento a guardar
    switch(this.video.type){
      case 'video/mp4':
        var tipo_cv = ".mp4"
        break;
      case 'video/avi':
        var tipo_cv = ".avi"
        break;
    }

    var nombre_cv =this.video.name.split(tipo_cv)[0].replaceAll(' ', '_');

    console.log(nombre_cv)
    console.log(tipo_cv)
    
    var CV = {
      nombre:nombre_cv,
      tipo:tipo_cv,
      fecha: new Date()
    }

    const esconderSpinner = combineLatest([
      from(this.SubirCvService.subirCV(this.user_email || "", nombre_cv, this.video, tipo_cv)), 
      from(this.AuthService.updateCV(this.user.id, CV)),
      this.AuthService.updateUser(this.user.id, {ultimo_video_cv : new Date()})
    ])


    //subirlo al storage de firebase
    

    esconderSpinner.subscribe(data =>{
      console.log(data)
      this.spinner.hide()
      this.toastr.success('Se ha subido el video CV con exito!')
      this.agregarvideoCV = false;
    },
    err => this.toastr.warning('No se ha podido subir el video CV, intente mas tarde.'))
  }



  checkearSiHayVideo(){
    if(this.user?.CVs?.length>0){
      return this.user.CVs.find((cv:any) => cv.tipo == '.mp4' || cv.tipo=='.avi')

    }
    return false;
  }

}
