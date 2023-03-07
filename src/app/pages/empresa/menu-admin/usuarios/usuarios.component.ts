import { Component, OnInit } from '@angular/core';
import { BusquedaUsuariosService } from 'src/app/services/busqueda-usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: any[] = [];

  userSelected:any;
  constructor(
    private BusquedaUsuariosService: BusquedaUsuariosService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.BusquedaUsuariosService.getAllUsersNotVerified()
    .subscribe(users => this.users = users);
  }


  verificarUsuario(userSelected:any){
    console.log(userSelected)

    this.AuthService.updateUser(userSelected.idUser, {verificado: true}).then(console.log)
  }

}
