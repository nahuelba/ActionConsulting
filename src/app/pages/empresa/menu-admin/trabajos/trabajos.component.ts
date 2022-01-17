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

  constructor(
    private CardService: CardService,
    private AuthService: AuthService,
    private PostulacionService:PostulacionService
  ) { }

  ngOnInit(): void {
    this.CardService.getAllCards()
    .subscribe((jobs:job[]) => {
      this.jobs = jobs
      this.jobs.map(job => {
        
        this.PostulacionService.getPostulacion(job.id)
        .subscribe(postulacion =>{ 
          if(job){
            job['postulaciones'] = postulacion
          }
        })
      })
      
      this.loader = false
      console.log(this.jobs)
    })
  }

}
