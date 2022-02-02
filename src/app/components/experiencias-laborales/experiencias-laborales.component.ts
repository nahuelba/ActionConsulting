import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencias-laborales',
  templateUrl: './experiencias-laborales.component.html',
  styleUrls: ['./experiencias-laborales.component.css']
})
export class ExperienciasLaboralesComponent implements OnInit {

  @Input() Experiencia:any

  constructor() { }

  ngOnInit(): void {
  }

}
