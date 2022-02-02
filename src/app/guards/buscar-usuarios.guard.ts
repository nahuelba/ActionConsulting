import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusquedaUsuariosService } from '../services/busqueda-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosGuard implements CanActivate {
  constructor(
    private router: Router, 
    private BusquedaUsuariosService:BusquedaUsuariosService,
    private toastr:ToastrService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.BusquedaUsuariosService.getUsuariosReveladosSinId()
      .pipe(
        map((usuariosRevelados:any) => {
          console.log(usuariosRevelados)
          const categoria = JSON.parse(localStorage.getItem('categoria') || "")
          if(usuariosRevelados){
            if(categoria?.usuarios - usuariosRevelados.length > 0){

              return true
            }else{
              this.router.navigate(['/empresa/buscar-usuarios'])
              this.toastr.error('No te quedan mas usuarios por revelar. Por favor actualize el plan.')
              return false
            }
          }else{
            
            return false
          }

          
          
      
        })
      )
  }
  
}
