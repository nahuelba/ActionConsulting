import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private AuthService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.AuthService.getUserAfsSinId()
    // .pipe(
    //   map((user:any) => {
    //     debugger
    //     if(user.length==0){
    //       return true
    //     }
    //     if(user == false){
    //      this.router.navigate(['/personal']);
    //      return false
    //    }
    //      if (user.admin) {
    //        return true;
    //      } else {
    //        this.router.navigate(['/empresa']);
    //        return false;
    //      }
    //    })
    //   )
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
        
        
          return true;
      })
    )
  }


}
