import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mas-datos',
  templateUrl: './mas-datos.component.html',
  styleUrls: ['./mas-datos.component.css']
})
export class MasDatosComponent implements OnInit {

  
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Currículum | ACTION HUMAN CAPITAL CONSULTING');

  }

 

}
