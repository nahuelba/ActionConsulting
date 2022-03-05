import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json'

@Component({
  selector: 'app-tabla-precios',
  templateUrl: './tabla-precios.component.html',
  styleUrls: ['./tabla-precios.component.css']
})
export class TablaPreciosComponent implements OnInit {

  categorias = categorias

  user:any
  constructor(private AuthService:AuthService,private titleService: Title,) { }

  ngOnInit(): void {
    this.titleService.setTitle('Precios | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserAfsSinId()
    .subscribe(user => {
      console.log(user)
      this.user = user
    })
  }

}
