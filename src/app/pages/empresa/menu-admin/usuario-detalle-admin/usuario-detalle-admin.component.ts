import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-detalle-admin',
  templateUrl: './usuario-detalle-admin.component.html',
  styleUrls: ['./usuario-detalle-admin.component.css']
})
export class UsuarioDetalleAdminComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Detalle del Usuario | ACTION HUMAN CAPITAL CONSULTING');

  }


}
