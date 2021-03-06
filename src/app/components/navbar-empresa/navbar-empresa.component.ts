import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import menu from 'src/assets/Opciones/menu.json'

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  @Input() admin:boolean = false;
  @Input() user:any;
  @Input() categoria:string = "Estándar"


  menu = menu


  constructor(
    public router:Router, 
    private authService:AuthService, 
    private spinner:NgxSpinnerService

    ) { }

  ngOnInit(): void {
  }

  logout(){
    this.spinner.show()
    this.authService.logout()
    .then(data => this.spinner.hide())
    // this.user=""

    this.router.navigate(['/'])
  }

 

}
