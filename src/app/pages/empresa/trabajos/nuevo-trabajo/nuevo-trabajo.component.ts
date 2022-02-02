import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';



declare var $:any;


@Component({
  selector: 'app-nuevo-trabajo',
  templateUrl: './nuevo-trabajo.component.html',
  styleUrls: ['./nuevo-trabajo.component.css']
})
export class NuevoTrabajoComponent implements OnInit {
  constructor(    private titleService: Title){}
  
  ngOnInit(): void {
    this.titleService.setTitle('Publicar Aviso | ACTION HUMAN CAPITAL CONSULTING');
  }
  
  

}
