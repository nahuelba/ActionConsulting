import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';
import { fader } from './route-animations';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {
  constructor(private deviceService: DeviceDetectorService, public toastService:ToastService){}

  ngOnInit(){
    // if(this.deviceService.isMobile()){
    //   window.location.href = environment.mobileLink;
    // }
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
