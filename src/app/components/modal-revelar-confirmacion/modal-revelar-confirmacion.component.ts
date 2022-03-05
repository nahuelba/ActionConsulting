import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-revelar-confirmacion',
  templateUrl: './modal-revelar-confirmacion.component.html',
  styleUrls: ['./modal-revelar-confirmacion.component.css']
})
export class ModalRevelarConfirmacionComponent implements OnInit {

  @Input() CV:any

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
