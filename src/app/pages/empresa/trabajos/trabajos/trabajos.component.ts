import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json';
import { combineLatest } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private CardService: CardService,
    private AuthService: AuthService,
    private PostulacionService: PostulacionService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Lista de Avisos | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserLogged().subscribe((user: any) => {
      this.user = user;
      
      combineLatest([this.AuthService.getUserAfs(user.uid), this.CardService.getCardsDelUsuario(user.uid)])
      .subscribe(([userData, jobs]:any) =>{
        this.user['datos'] = userData;
        this.user['datos']['categoria'] = this.categorias.find(
          (categoria: any) => categoria.categoria == userData.categoria
        );
        this.jobs = jobs;
        this.loader = false;

      })

    });
  }

}
