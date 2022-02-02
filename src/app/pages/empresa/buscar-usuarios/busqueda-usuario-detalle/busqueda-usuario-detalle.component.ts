import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-busqueda-usuario-detalle',
  templateUrl: './busqueda-usuario-detalle.component.html',
  styleUrls: ['./busqueda-usuario-detalle.component.css']
})
export class BusquedaUsuarioDetalleComponent implements OnInit {

  constructor(public location: Location, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Detalle del Usuario | ACTION HUMAN CAPITAL CONSULTING');

  }

 
}
