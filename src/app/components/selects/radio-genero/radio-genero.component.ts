import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-genero',
  templateUrl: './radio-genero.component.html',
  styleUrls: ['./radio-genero.component.css']
})
export class RadioGeneroComponent implements OnInit {

  @Input() formGroup!:FormGroup
  @Input() indistinto:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
