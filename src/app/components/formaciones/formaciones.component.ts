import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formaciones',
  templateUrl: './formaciones.component.html',
  styleUrls: ['./formaciones.component.css']
})
export class FormacionesComponent implements OnInit {

  @Input() formacion:any

  constructor() { }

  ngOnInit(): void {
  }

}
