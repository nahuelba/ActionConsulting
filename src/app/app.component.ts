import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DeviceDetectorService } from 'ngx-device-detector';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { fader } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {
  constructor(
    private deviceService: DeviceDetectorService,
    private config: NgSelectConfig

    ){
      this.config.notFoundText = 'Elemento no encontrado.';
    }

  ngOnInit(){
   
  }
    // if(this.deviceService.isMobile()){
    //   window.location.href = environment.mobileLink;
    // }
    
  

 

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
