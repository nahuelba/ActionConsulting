import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { job } from 'src/app/interfaces/card.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  jobs:job[] = []

  constructor(
    private authService:AuthService,
    private titleService: Title,
    private CardService:CardService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Empresa | ACTION HUMAN CAPITAL CONSULTING');

    this.authService.getUserLogged().subscribe((user:any) => {

      this.CardService.getCardsDelUsuario(user.uid)
      .subscribe(jobs => {
        this.jobs = jobs
      })
    })
  }

}
