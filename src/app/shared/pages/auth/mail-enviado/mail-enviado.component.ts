import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mail-enviado',
  templateUrl: './mail-enviado.component.html',
  styleUrls: ['./mail-enviado.component.css']
})
export class MailEnviadoComponent implements OnInit {

  email:string = ""

  constructor(private AuthService:AuthService, private toastr:ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.paramMap.get('email') || "";


  }

  reenviarEmail(){
    this.AuthService.RecoverPassword(this.email)
      .then(
        data =>{ 
          // console.log(data)
          this.toastr.success('Mail enviado. Revisa tu correo.')
        },
        err => {
          this.toastr.error('No se pudo enviar el email. Intenta mas tarde.')
          console.log(err)
        })

  }
}
