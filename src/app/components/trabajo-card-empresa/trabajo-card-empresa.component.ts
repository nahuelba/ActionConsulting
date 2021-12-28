import { Component, Input, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-trabajo-card-empresa',
  templateUrl: './trabajo-card-empresa.component.html',
  styleUrls: ['./trabajo-card-empresa.component.css']
})
export class TrabajoCardEmpresaComponent implements OnInit {

  @Input() job!:job;
  @Input() empresa:boolean =true;
  loader =true;
  count =10;

  constructor() { }

  ngOnInit(): void { }

  getInnerText(el:any) {
    return el.innerText;
  }

}
