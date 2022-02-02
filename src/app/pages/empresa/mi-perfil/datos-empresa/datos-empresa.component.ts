import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent implements OnInit {

  miPerfilForm = new FormGroup({
    nombre: new FormControl(''),
    categoria: new FormControl('')
  })

  constructor(private AuthService:AuthService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Datos de Empresa | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) =>{
      this.miPerfilForm.controls.nombre.setValue(user.nombre)
      this.miPerfilForm.controls.categoria.setValue(user.categoria)
    })

  }

}
