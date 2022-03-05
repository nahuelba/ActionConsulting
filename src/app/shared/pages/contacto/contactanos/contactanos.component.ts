import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {


  contactoForm = this.fb.group({
    nombre:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    mensaje:['', Validators.required]

  })

  constructor(
    private fb:FormBuilder,
    private AuthService:AuthService,
    private route:ActivatedRoute,
    private title:Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Contacto | ACTION HUMAN CAPITAL CONSULTING')
    const categoria = this.route.snapshot.params.categoria;
    console.log(categoria)
    if(categoria){
      this.contactoForm.controls.mensaje.setValue('Hola, me gustaría adherirme a la categoría ' + categoria + '. Muchas gracias.')
    }


    this.AuthService.getUserAfsSinId()
    .subscribe((user:any) => {
      console.log(user)
      if(user){
        this.contactoForm.patchValue(user)
      }
    })

  }

  enviar(){
    if(this.contactoForm.valid){
      console.log(this.contactoForm.value)
    }
  }

}
