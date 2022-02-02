import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { experiencia_laboral } from 'src/app/interfaces/experiencia.interface';

@Component({
  selector: 'app-modal-eliminar-experiencia',
  templateUrl: './modal-eliminar-experiencia.component.html',
  styleUrls: ['./modal-eliminar-experiencia.component.css']
})
export class ModalEliminarExperienciaComponent implements OnInit {

  @Input() experiencia!:experiencia_laboral

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.experiencia)
  }

}
