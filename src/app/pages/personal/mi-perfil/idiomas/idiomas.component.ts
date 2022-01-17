import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import idiomas from 'src/assets/Opciones/idiomas.json';


declare var $: any;
@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  idiomas:any = idiomas

  

  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    setTimeout(function () {
      $('.selectpicker').selectpicker('refresh'); // refresh the selectpicker with fetched courses
    }, 50);

    // this.idiomasForm = this.fb.group({
    //   persons: this.fb.array([])
    // });


  }

  addIdioma(){
    // this.idiomasForm.addControl("fecha_nacimiento", new FormControl('')) 
  }
}
