import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarEmailGuard implements CanActivate, CanActivateChild {

  constructor(private router:Router, private AuthService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.getUserLogged()
      .pipe(
        // take the first value emitted and complete
        first(),
        map((value:any) => {
          if(value){
  
            if(value.emailVerified) {
              this.router.navigate(['/personal'])
              return false;
                
            }else{
              // this.router.navigate(['/auth/register/verificar-email'])
              return true
            }
          }
          
            this.router.navigate(['/auth/register/tipo-cuenta'])
            return false;
        })
      )
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.getUserLogged()
      .pipe(
        // take the first value emitted and complete
        first(),
        map((value:any) => {
          if(value){
  
            if(value.emailVerified) {
              this.router.navigate(['/personal'])
              return false;
                
            }else{
              this.router.navigate(['/auth/register/verificar-email'])
              return false;
            }
          }
          
          
            return true;
        })
      )
      this.router.navigate(['/auth/register/verificar-email'])
  }
  
}
