import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalPreciosComponent } from '../components/modal-precios/modal-precios.component';

@Injectable({
  providedIn: 'root'
})
export class LaunchModalPreciosService {

  constructor(    private modalService: NgbModal, private toastr:ToastrService) { }

  disparaModalPrecios(){
    const modalRef = this.modalService.open(ModalPreciosComponent, { size: 'xl', centered: true, scrollable:true } )
    this.toastr.error('No te quedan mas avisos para publicar. Mejora tu cuenta para poder publicar más.')
  }
}
