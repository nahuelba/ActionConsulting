import { Component, Input, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-trabajo-detalle-card',
  templateUrl: './trabajo-detalle-card.component.html',
  styleUrls: ['./trabajo-detalle-card.component.css']
})
export class TrabajoDetalleCardComponent implements OnInit {

  @Input() job!:job;
  @Input() empresa:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
