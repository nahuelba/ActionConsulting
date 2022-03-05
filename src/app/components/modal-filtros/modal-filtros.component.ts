import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-filtros',
  templateUrl: './modal-filtros.component.html',
  styleUrls: ['./modal-filtros.component.css']
})
export class ModalFiltrosComponent implements OnInit {

  @Input() filtros:any

  lugar:any



  constructor(
    public activeModal: NgbActiveModal,
    private fb:FormBuilder
    ) { }

  
  filtrosForm = this.fb.group({
    pais:[''],
    provincia:[''],
    ciudad:[''],
    puesto:[''],
    rubro:[''],
    sueldoMin:[''],
    sueldoMax:[''],
    edadMin:[''],
    edadMax:[''],
    genero:['Indistinto'],
    ultimoCV:['Indistinto'],
    licencia: [],
    movilidad: [],
    discapacidad: []
  })
  ngOnInit(): void {
    if(this.filtros){

      console.log(this.filtros)
      this.filtrosForm.patchValue(this.filtros)
      this.lugar = {
        pais:this.filtros.pais,
        provincia:this.filtros.provincia,
        ciudad:this.filtros.ciudad
      }
    }
  }

}
