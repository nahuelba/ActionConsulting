import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostulacionService } from 'src/app/services/postulacion.service';


@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {

  jobs: job[] = [];

  loader: boolean = true;

  filter: string = '';

  calcularExpiracion: boolean = false

  user:any

  constructor(
    private CardService: CardService,
    private AuthService: AuthService,
    private PostulacionService:PostulacionService,

  ) {}

  ngOnInit(): void {   

    this.AuthService.getUserLogged().subscribe((user: any) => {
      this.user = user
    this.CardService.getCardsDelUsuario(user.uid)
    .subscribe((jobs: job[]) => {
    
        
         
      
        this.jobs = jobs
        // this.jobs.forEach(job => {
        //   this.PostulacionService.getPostulacion(job.id)
        //   .subscribe(postulacion => job['postulaciones'] = postulacion)
        // })
        // console.log(this.jobs)
        this.loader = false;
      });

    });
  }

}
