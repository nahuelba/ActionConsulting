import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service';

@Component({
  selector: 'app-trabajo-detalle-admin',
  templateUrl: './trabajo-detalle-admin.component.html',
  styleUrls: ['./trabajo-detalle-admin.component.css']
})
export class TrabajoDetalleAdminComponent implements OnInit {

  job!: job;

  loader:boolean = true;

  constructor(
    private CardService: CardService,
    private activatedRoute: ActivatedRoute,
    private PostulacionService:PostulacionService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.CardService.getDocumentById(id!)
    .subscribe((job: job | undefined) => {
      if(job){

        this.job = job
        this.PostulacionService.getPostulacion(job.id)
        .subscribe(postulacion =>{ 
          if(job){
            this.job['postulaciones'] = postulacion
          }
        })
      }
      console.log(job)

      this.loader = false;

    });
  }

}
