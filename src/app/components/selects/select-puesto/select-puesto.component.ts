import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import puestos from 'src/assets/Opciones/trabajos/puestos.json'

@Component({
  selector: 'app-select-puesto',
  templateUrl: './select-puesto.component.html',
  styleUrls: ['./select-puesto.component.css']
})
export class SelectPuestoComponent implements OnInit {

  puestos = puestos

  @Input() formGroup!:FormGroup
  @Input() obligatorio:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
