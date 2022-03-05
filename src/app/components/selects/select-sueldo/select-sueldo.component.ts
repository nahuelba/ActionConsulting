import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-sueldo',
  templateUrl: './select-sueldo.component.html',
  styleUrls: ['./select-sueldo.component.css']
})
export class SelectSueldoComponent implements OnInit {
  @Input() formGroup!:FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
