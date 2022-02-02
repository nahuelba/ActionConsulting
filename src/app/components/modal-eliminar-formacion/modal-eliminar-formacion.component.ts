import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { formacion } from 'src/app/interfaces/formacion.interface';

@Component({
  selector: 'app-modal-eliminar-formacion',
  templateUrl: './modal-eliminar-formacion.component.html',
  styleUrls: ['./modal-eliminar-formacion.component.css']
})
export class ModalEliminarFormacionComponent implements OnInit {
  @Input() formacion!:formacion

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
