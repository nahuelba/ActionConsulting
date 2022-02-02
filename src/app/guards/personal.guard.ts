import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuard implements CanActivate {


  constructor(private AuthService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


         
      return this.AuthService.getUserAfsSinId()
      .pipe(
        map((user:any) => {
          console.log(user)
          if(user === false){
            return true
          }
          if (user.tipo == 'personal') {
             return true;
           } else {
            this.router.navigate(['/empresa']);
            return false;
           }
         })
        )
    
  }
  
}
