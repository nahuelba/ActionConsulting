import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { job } from 'src/app/interfaces/card.interface';


@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css'],
})
export class TrabajoDetalleComponent implements OnInit {
  job!: job;

  loader:boolean = true;

  constructor(
    private CardService: CardService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.CardService.getDocumentById(id!)
    .subscribe((job: any) => {
      if(job){

        this.job = job
        this.loader = false;
      }
      console.log(job)

    });
  }

}
