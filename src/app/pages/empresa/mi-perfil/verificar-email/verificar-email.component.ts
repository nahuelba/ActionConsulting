import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {
  form = new FormGroup({
    email : new FormControl('')

  })

  user:any
  constructor(private authService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.authService.getUserLogged()
    .subscribe(user =>{ 
      this.form.controls.email.setValue(user?.email || "")  
      this.user = user

    })
  }

  enviarVerificacion(){
    debugger;
    this.authService.verifyEmail(this.user)
    .then((data:any) => {
      this.toastr.success('Se ha enviado el email para verificar. Revisa tu correo.')
    },
    (err:any)=>{
      this.toastr.error('Se han enviado muchas peticiones. Intenta mas tarde.')
    })
  }



}
