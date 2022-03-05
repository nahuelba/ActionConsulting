import { Component, Input, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { DiasRestantesService } from 'src/app/services/dias-restantes.service';

@Component({
  selector: 'app-tabla-avisos',
  templateUrl: './tabla-avisos.component.html',
  styleUrls: ['./tabla-avisos.component.css']
})
export class TablaAvisosComponent implements OnInit {

  @Input() jobs!:job[];
  @Input() admin:boolean = false;

  constructor(public diasRestantesService:DiasRestantesService) { }

  ngOnInit(): void {
    
  
   }


 

}
