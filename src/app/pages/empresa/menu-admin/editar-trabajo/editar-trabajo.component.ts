import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service';

@Component({
  selector: 'app-editar-trabajo',
  templateUrl: './editar-trabajo.component.html',
  styleUrls: ['./editar-trabajo.component.css']
})
export class EditarTrabajoComponent implements OnInit {

  job!: job;

  constructor(
    private CardService: CardService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.CardService.getDocumentById(id!)
    .subscribe((job: job | undefined) => {
      if(job){
        this.job = job
       
      }
      console.log(job)
    });



  }

}
