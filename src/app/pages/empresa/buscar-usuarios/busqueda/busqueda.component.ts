import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { user } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaUsuariosService } from 'src/app/services/busqueda-usuarios.service';
import categorias from 'src/assets/Opciones/trabajos/categorias.json'

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

 
  users:any[] = []

  user:any

  usuarios_restantes:any
  constructor(
    private BusquedaUsuariosService:BusquedaUsuariosService,
    private route: ActivatedRoute,
    private authService:AuthService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Busqueda de Usuarios | ACTION HUMAN CAPITAL CONSULTING');

    this.authService.getUserAfsSinId().pipe(take(1))
    .subscribe((user:any) => {
      this.user = user
      this.BusquedaUsuariosService.getUsuariosRevelados(user.id)
      .subscribe(usuarios => {

       
       const categoria = categorias.find(categoria => categoria.categoria == user.categoria)
   
        if(categoria){

          this.usuarios_restantes= categoria.curriculums  - usuarios.length
         
        }
      })
    })
    const puesto  =this.route.snapshot.paramMap.get('puesto')
    
    this.route.queryParamMap
    .subscribe((params) => {
      
      console.log(params)
      const paramsKeys =  { ...params }

      this.BusquedaUsuariosService.buscarUsuarios(puesto || "", paramsKeys)
      .subscribe(usuarios => {
        console.log(usuarios)
        this.users = usuarios
        
      })
    })

  }

}
