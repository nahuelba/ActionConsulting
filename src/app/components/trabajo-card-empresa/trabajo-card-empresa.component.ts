import { Component, Input, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { DiasRestantesService } from 'src/app/services/dias-restantes.service';

@Component({
  selector: 'app-trabajo-card-empresa',
  templateUrl: './trabajo-card-empresa.component.html',
  styleUrls: ['./trabajo-card-empresa.component.css']
})
export class TrabajoCardEmpresaComponent implements OnInit {

  @Input() job!:job;
  @Input() empresa:boolean =true;
  @Input() admin = false

  dias_restantes:number = 0

  constructor(public diasRestantesService:DiasRestantesService) { }

  ngOnInit(): void {

    if(this.job){
      this.diasRestantesService.calcularDiasRestantes(this.job)
      this.dias_restantes = this.diasRestantesService.vencimiento
    }
   }

  ngOnChanges(){
  }

  getInnerText(el:any) {
    return el.innerText;
  }

}
