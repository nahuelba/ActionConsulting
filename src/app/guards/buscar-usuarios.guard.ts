import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalPreciosComponent } from '../components/modal-precios/modal-precios.component';
import { BusquedaUsuariosService } from '../services/busqueda-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosGuard implements CanActivate {
  constructor(
    private router: Router, 
    private BusquedaUsuariosService:BusquedaUsuariosService,
    private toastr:ToastrService,
    private modalService: NgbModal
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
              const modalRef = this.modalService.open(ModalPreciosComponent, { size: 'xl', centered: true, scrollable:true } )
              return false
            }
          }else{
            
            return false
          }

          
          
      
        })
      )
  }
  
}
