import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioUsuariosGuard implements CanActivate {
  constructor(
    private router: Router, 
    private AuthService:AuthService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthService.getUserAfsSinId()
    .pipe(
      first(),
      map((user:any) =>{
          if(user.categoria == "Estándar"){
            this.router.navigate(['/empresa/avisos'])
            return false
          }else{

            return true
          }
        }
        
      )
    )
    
    // return true;
  }
  
}
