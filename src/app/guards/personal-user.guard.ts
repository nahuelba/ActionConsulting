import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalUserGuard implements CanActivate {
  constructor(private AuthService:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.getUserAfsSinId()
      .pipe(
        map((user:any) => {
          if(user == false){
           this.router.navigate(['/auth/login']);
           return false
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
