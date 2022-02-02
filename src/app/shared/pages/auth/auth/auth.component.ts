import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader } from 'src/app/route-animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    fader
  ]
})
export class AuthComponent implements OnInit {

  tipo!:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url.includes('personal')){

      this.tipo = '/personal'

    }else if(this.router.url.includes('empresa')){
      this.tipo = '/empresa'
    }else{
      this.router.navigate(['/personal']);
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
