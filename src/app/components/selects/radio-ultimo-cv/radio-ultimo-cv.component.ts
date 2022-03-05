import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-ultimo-cv',
  templateUrl: './radio-ultimo-cv.component.html',
  styleUrls: ['./radio-ultimo-cv.component.css']
})
export class RadioUltimoCvComponent implements OnInit {

  @Input() formGroup!:FormGroup


  Fechas = [
    "Indistinto",
    "Menor a 15 días",
    "Menor a 1 mes",
    "Menor a 3 meses",
    "Menor a 6 meses",
    "Menor a 12 meses",
    "Menor a 18 meses"

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
