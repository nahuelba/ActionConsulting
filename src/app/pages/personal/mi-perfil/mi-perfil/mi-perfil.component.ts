import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  user:any
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
    this.AuthService.getUserAfsSinId()
    .subscribe( user => this.user=user)
  }

}
