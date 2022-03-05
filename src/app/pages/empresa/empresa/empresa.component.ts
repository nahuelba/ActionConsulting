import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { combineLatest, concat, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { fader } from 'src/app/route-animations';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  animations: [
    fader
  ]
})
export class EmpresaComponent implements OnInit {

  admin:boolean =false

  categoria:string ="Estándar"

  user:any;
  year = new Date().getFullYear()

  constructor(private AuthService:AuthService){}

  ngOnInit(): void {

    combineLatest([this.AuthService.getUserLogged(), this.AuthService.getUserAfsSinId()])
    .subscribe(([res, user]:any) => {
  
        this.user={ ...res, datos:user};

        this.categoria = this.user.datos.categoria
        console.log(this.user)
        if(user == false){
          this.admin=true;
        }else{
          this.admin = user?.admin
        }

          }
      
    )
    


    
    // this.AuthService.getUserLogged()
    //   .subscribe((res:any) => {       
    //     this.AuthService.getUserAfs(res.uid)
    //     .subscribe((user:any) => {
    //       this.user={ ...res, datos:user};
    //       user.admin == true ? this.admin=true: this.admin=false;
    
    //     })
    //   })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


  
}
