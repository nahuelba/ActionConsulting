import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-precios',
  templateUrl: './modal-precios.component.html',
  styleUrls: ['./modal-precios.component.css']
})
export class ModalPreciosComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
