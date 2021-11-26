import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { Filters } from 'src/app/interfaces/filters.interface';
import { FilterDatePipe } from 'src/app/pipes/filter-date.pipe';
import { FilterTipoPuestoPipe } from 'src/app/pipes/filter-tipo-puesto.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CardService } from 'src/app/services/card.service';


declare var $:any;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers:[DatePipe, FilterPipe, FilterDatePipe, FilterTipoPuestoPipe]
})
export class PersonalComponent implements OnInit {
  
  filters:Filters = {
    provincia :"Provincia",
    date:"Fecha de Publicación",
    tipoPuesto: "Tipo de Puesto"

  }
  
 
  jobs!:job[];

  today = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  lugares:any[] = []
  tipoPuestos:any[] = []

  loader=true;

  jobsCarrousel!:job[];

  constructor(
    private CardService:CardService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.getJobs()

   
  }



  

  getJobs(){
    this.CardService.getCards()
    .subscribe(
      data=>{
        this.jobs=data


        this.loader=false;

        //Error Ngfor y Selectpicker
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker with fetched courses
         }, 50);

        //Extraer lugares
        let arrayLugares:any = []
        this.jobs.forEach(e => {arrayLugares.push(e.lugar) })

        this.lugares = this.CardService.removeDuplicates(arrayLugares)


        //extraer tipo de puesto
        let arraytipoPuesto:any = []
        this.jobs.forEach(e => arraytipoPuesto.push(e.tipo_puesto))

        this.tipoPuestos = this.CardService.removeDuplicates(arraytipoPuesto)

      },
      err=>console.log(err),

      
     
    )
  }



  




}
