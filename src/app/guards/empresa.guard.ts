import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { from, Observable, pipe } from 'rxjs';
import { map, first, delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmpresaGuard implements CanActivate {
  user: any;
  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

         
    return this.AuthService.getUserAfsSinId()
     .pipe(
       map((user:any) => {
         if(user == false){
          this.router.navigate(['/empresa/auth/login']);
          return false
        }
          if (user.tipo == 'empresa') {
            return true;
          } else {
            this.router.navigate(['/personal']);
            return false;
          }
        })
       )


  }
}
