import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthService.getUserLogged()
    .pipe(
      // take the first value emitted and complete
      first(),
      map((user:any) => {
          if(!user) {
            this.router.navigate(['/auth/login'])
            return false;
              
          }

          return true;
          
      })
    )
  }
  
}
