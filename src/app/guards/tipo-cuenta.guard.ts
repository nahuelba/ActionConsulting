import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.AuthService.getUserAfsSinId()
     .pipe(
       map((user:any) => {
      
         if(user === false){
          return true
        }
        if (user.length==0) {
          this.router.navigate(['/tipo-cuenta'])
          return false;
        } else {
          return true
        }
      })
    )
  }
  
}
