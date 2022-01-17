import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tipo-cuenta',
  templateUrl: './tipo-cuenta.component.html',
  styleUrls: ['./tipo-cuenta.component.css']
})
export class TipoCuentaComponent implements OnInit {

  constructor(private router:Router, private spinner:NgxSpinnerService, private AuthService:AuthService) { }

  ngOnInit(): void {
  }

  tipoCuenta(tipo:string){


    //spinner
    this.spinner.show()

    this.AuthService.getUserLogged()
    .subscribe(user => {
      var user_data = {
        admin:false,
        nombre: user?.displayName,
        tipo: tipo,
        foto: user?.photoURL
      }
      //crear registro en users firestore
      this.AuthService.saveUser(user_data, user?.uid || "")
      .then(data =>{ 
        console.log(data)
        //redirigir segun el tipo
        this.spinner.hide()
        this.router.navigate(['/' + tipo])
      })
    })
    
   

   
    


    




  }

}
