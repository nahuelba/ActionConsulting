import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {

  user:any

  constructor(private AuthService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {

    this.AuthService.getUserLogged()
    .subscribe(data => this.user=data)
  }

  reenviarEmail(){
    this.AuthService.verifyEmail(this.user)
    .then((data:any) => {
      this.toastr.success('Se ha enviado el email para verificar. Revisa tu correo.')
    },
    (err:any)=>{
      this.toastr.error('Se han enviado muchas peticiones. Intenta mas tarde.')
    })
  }

}
