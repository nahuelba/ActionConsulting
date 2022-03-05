import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { job } from 'src/app/interfaces/card.interface';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-trabajo-detalle',
  templateUrl: './trabajo-detalle.component.html',
  styleUrls: ['./trabajo-detalle.component.css'],
})
export class TrabajoDetalleComponent implements OnInit {
  job!: job;

  loader:boolean = true;

  user:any

  constructor(
    private CardService: CardService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private AuthService:AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Detalle del Aviso | ACTION HUMAN CAPITAL CONSULTING');
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.AuthService.getUserAfsSinId()
    .subscribe(user => this.user = user)
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
