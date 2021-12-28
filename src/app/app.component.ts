import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private deviceService: DeviceDetectorService){}

  ngOnInit(){
    // if(this.deviceService.isMobile()){
    //   window.location.href = environment.mobileLink;
    // }
  }
}
