import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import rubros from 'src/assets/Opciones/trabajos/rubros.json'

@Component({
  selector: 'app-select-rubro',
  templateUrl: './select-rubro.component.html',
  styleUrls: ['./select-rubro.component.css']
})
export class SelectRubroComponent implements OnInit {

  @Input() formGroup!:FormGroup

  rubros = rubros

  constructor() { }

  ngOnInit(): void {
  }

}
