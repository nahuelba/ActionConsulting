import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-empresa',
  templateUrl: './navbar-empresa.component.html',
  styleUrls: ['./navbar-empresa.component.css']
})
export class NavbarEmpresaComponent implements OnInit {

  constructor(public router:Router, ) { }

  ngOnInit(): void {
  }

 

}
