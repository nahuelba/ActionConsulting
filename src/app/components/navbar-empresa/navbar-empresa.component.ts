import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  @Input() admin:boolean = false;
  @Input() user:any;

  constructor(public router:Router, private authService:AuthService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    console.log(this.user)
  }

  logout(){
    this.spinner.show()
    this.authService.logout()
    .then(data => this.spinner.hide())
    // this.user=""

    this.router.navigate(['/'])
  }

 

}
