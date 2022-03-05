import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json';
import { combineLatest } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DiasRestantesService } from 'src/app/services/dias-restantes.service';
import { Router } from '@angular/router';
import { LaunchModalPreciosService } from 'src/app/services/launch-modal-precios.service'

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css'],
})
export class TrabajosComponent implements OnInit {
  jobs: job[] = [];

  loader: boolean = true;

  filter: string = '';

  calcularExpiracion: boolean = false;

  user: any;

  categorias = categorias;
  filterPrioridad: string = "";

  constructor(
    private CardService: CardService,
    private AuthService: AuthService,
    private PostulacionService: PostulacionService,
    private titleService: Title,
    private diasRestantesService:DiasRestantesService,
    private router:Router,
    private LaunchModalService:LaunchModalPreciosService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Lista de Avisos | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserLogged().subscribe((user: any) => {
      this.user = user;
      
      combineLatest([this.AuthService.getUserAfs(user.uid), this.CardService.getTrabajosAdminOno()])
      .subscribe(([userData, jobs]:any) =>{
        this.user['datos'] = userData;
        this.user['datos']['categoria'] = this.categorias.find(
          (categoria: any) => categoria.categoria == userData.categoria
        );
        this.jobs = jobs;
        this.loader = false;

        this.jobs.forEach((job:any) => {
          //Calcular los dias restantes de cada trabajo
          this.diasRestantesService.calcularDiasRestantes(job)
          job['dias_restantes'] = this.diasRestantesService.vencimiento

          //Calcular la cantidad de postulaciones de cada trabajo
          this.PostulacionService.getPostulaciones(job.id)
          .subscribe((postulaciones:any) => {
            console.log(postulaciones)
            job['postulaciones'] = postulaciones.length
          })

          if(userData.admin){
            //escribir el nombre de la empresa
            this.AuthService.getUserConId(job.empresa_id)
            .subscribe((empresa:any) => {
              job['empresa'] = empresa.nombre
            })
          }


        })
  
        console.log(this.jobs)


      })

    });
  }



  trabajoNuevo(){
    if(this.user.datos.avisos==0){
      this.LaunchModalService.disparaModalPrecios()
    }else{

      this.router.navigate(['/empresa/avisos/nuevo'])
    }
  }  

}
