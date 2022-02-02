import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  loader:boolean = true;
  users:any[] = []

  constructor(private AuthService:AuthService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Lista de usuarios | ACTION HUMAN CAPITAL CONSULTING');

    this.AuthService.getAllUsers()
    .subscribe(users => {
      this.users=users;
      this.loader=false;

    })
  }

}
