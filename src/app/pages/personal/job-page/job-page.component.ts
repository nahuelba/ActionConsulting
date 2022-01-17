import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';
import { SubirCvService } from 'src/app/services/subir-cv.service';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css'],
})
export class JobPageComponent implements OnInit {
  job: any;

  user: any;

  id: string = '';

  postulado = {
    postulacionTexto: '',
    postulado: false,
  };

  loader = true;

  cvCargado = false;
  errorCV = false;

  postulacion: Postulacion = {
    user: '',
    fecha: new Date(),
    trabajo: ''
  };
  pdf:any

  constructor(
    private CardService: CardService,
    private route: ActivatedRoute,
    private PostulacionService: PostulacionService,
    private router: Router,
    private SubirCvService: SubirCvService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    //Get Id from url
    let id: any = this.route.snapshot.paramMap.get('id');

    this.id = id;

    //Consult Firebase with id
    this.CardService.getDocumentById(id).subscribe((job) => {
      this.job = job;
      console.log(this.job);
      this.loader = false;
    });

    this.postulacion.trabajo = id;
  }

  checkUser(user: any) {
    this.user = user;
    //SI la cuenta es tipo empresa no dejar postularse
    if (user.datos.tipo == 'empresa') {
      this.postulado.postulado = true;
      this.postulado.postulacionTexto =
        'Esta cuenta es empresa, no se puede postular.';
      return;
    }

  

    // debugger
    console.log(user);
    this.postulacion.user = user.uid;

    //verificar si esta postulado
    this.PostulacionService.verificarPostulacion(
      user.uid,
      this.job.id
    ).subscribe(
      (data) => {
        console.log(data);
        if (data.length == 0) {
          this.postulado.postulado = false;
          this.postulado.postulacionTexto = 'Postularse';
        } else {
          this.postulado.postulado = true;
          this.postulado.postulacionTexto = 'Ya estas postulado';
        }
      },
      (err) => console.log(err)
    );
  }

  Postulacion() {
    this.spinner.show()
    

    console.log(this.postulacion);
    this.PostulacionService.RealizarPostulacion(this.postulacion)
      .then((res) => {
        
        console.log(res);
        this.ngOnInit();
        this.postulado.postulado = true;
        this.postulado.postulacionTexto = 'Ya estas postulado';
        this.spinner.hide()
        this.toastr.success('Te has postulado correctamente!')
      })
      .catch((e) => {
        console.log(e);
        this.spinner.hide()
        this.toastr.warning('No te pudimos postular, intenta mas tarde.')
      });
  }

 
}
