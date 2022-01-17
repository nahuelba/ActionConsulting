import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { ToastrService } from 'ngx-toastr';
import { job } from 'src/app/interfaces/card.interface';
import { Postulacion } from 'src/app/interfaces/postulacion.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { SubirCvService } from 'src/app/services/subir-cv.service';

declare var $: any;
@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css'],
})
export class PostulacionesComponent implements OnInit {
  postulaciones: Postulacion[] = [];

  jobs: job[] = [];

  loader:boolean = true;

  empresas: any = [];
  empresaSeleccionada: any = '';
  trabajos: job[] = [];
  puestoSeleccionado: string = '';
  constructor(
    private PostulacionesService: PostulacionService,
    private CardService: CardService,
    private AuthService: AuthService,
    private SubirCVService:SubirCvService,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.PostulacionesService.getPostulaciones().subscribe(
      (postulaciones: any) => {
        // console.log(postulaciones);
        this.postulaciones = postulaciones;

        this.postulaciones.forEach((postulacion: Postulacion) => {
          this.CardService.getDocumentById(postulacion.trabajo).subscribe(
            (trabajo: job | undefined) => {
              postulacion['trabajo'] = trabajo;
            }
          );
        });

        this.loader = false;
        debugger;
        this.AuthService.getAllEmpresas().subscribe((empresas) => {
          this.empresas = empresas;

          this.postulaciones.forEach(postulacion => {
            this.empresas.forEach((empresa:any) => {
              if(postulacion.trabajo.empresa_id==empresa.id){
                postulacion['trabajo']['nombre_empresa']=empresa.nombre
              }
            });
          })
          setTimeout(function () {
            $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
          }, 50);


          //get user
        });
        postulaciones.forEach((postulacion:any) => {
          
          this.AuthService.getUserAfs(postulacion.user)
          .subscribe((user:any) => {
            postulacion['user'] = user
          })
        });
        console.log(this.postulaciones)
      }
    );

  }

  setTrabajo() {
    if (this.empresaSeleccionada.id) {
      this.CardService.getCardsDelUsuario(
        this.empresaSeleccionada.id
      ).subscribe((trabajos: job[]) => {
        this.trabajos = trabajos;
        console.log(this.trabajos);
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
        }, 50);
      });
    } else {
      this.puestoSeleccionado = '';
    }
  }

  descargarCV(cv: any) {
    if(!cv){
      //agregar toast de aviso
      // console.log('No existe el curriculum')
      this.toastr.error('No existe el curriculum')
      return;
    }
    this.spinner.show()
    
    this.SubirCVService.ObtenerPDF(cv.nombre, cv.tipo)
    .subscribe(data => {
      this.spinner.hide()
      window.open(data, "_blank")
      
    },
    err => {
      this.spinner.hide()
      this.toastr.error('No se pudo obtener el Currículum')
    })
  }
}
