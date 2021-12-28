import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { Filters } from 'src/app/interfaces/filters.interface';
import { FilterDatePipe } from 'src/app/pipes/filter-date.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CardService } from 'src/app/services/card.service';
import { FiltrosService } from 'src/app/services/filtros.service';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers:[DatePipe, FilterPipe, FilterDatePipe]
})
export class PersonalComponent implements OnInit {

  
  filters:Filters = {
    provincia :"",
    date:"",
    tipoPuesto: "",
    pais: "",
    ciudad:""

  }
  
 
  jobs!:job[];

  today = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  provincias:any[] = []
  tipoPuestos:any[] = []
  paises:any[] = []
  ciudades:any[] = []

  loader=true;

  jobsCarrousel!:job[];

  constructor(
    private CardService:CardService,
    public FiltrosService:FiltrosService,
    private router: Router,
    private cdRef:ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    
    this.getJobs()

   
  }

  ngAfterViewChecked(){

  this.cdRef.detectChanges();
}

  getJobs(){
    this.CardService.getCardsPublicadas()
    .subscribe(
      data=>{
        this.jobs=data
        console.log(this.jobs)


        this.loader=false;

        //extraer paises
        let arrayPaises:any = []
        this.jobs.forEach(e => arrayPaises.push(e.pais.pais))
        this.paises = this.CardService.removeDuplicates(arrayPaises)


       this.FiltrosService.extraer(this.jobs, '')


      },
      err=>console.log(err),

      
     
    )
  }

  filtro(filtro: string, texto:string){

    switch(filtro){
      case 'pais':
        this.filters.provincia = ""
        this.filters.ciudad = ""
        this.filters.pais=texto
    
        //   Extraer provincias
        let arrayProvincias:string[] = []
        this.jobs.forEach((e:job) => {
          if(e.pais.pais==texto){
            arrayProvincias.push(e.pais.provincia.provincia) 
          }
        })
        this.provincias = this.CardService.removeDuplicates(arrayProvincias)


        break;
      case 'provincia':
        this.filters.ciudad = ""
        this.filters.provincia= texto


        //   Extraer Ciudades
        let arrayCiudades:string[] = []
        this.jobs.forEach((e:job) => {
          if(e.pais.provincia.provincia==texto){
            arrayCiudades.push(e.pais.provincia.ciudad.ciudad) 
          }
        })
        this.ciudades = this.CardService.removeDuplicates(arrayCiudades)
        break;

      case 'ciudad':
        this.filters.ciudad=texto
        break;

      case 'tipo_puesto':
        this.filters.tipoPuesto=texto
        break;
      
      case 'fecha':
        this.filters.date =texto


    }

  }


  limpiarFiltros(){
    this.filters = {
      provincia :"",
      date:"",
      tipoPuesto: "",
      pais: "",
      ciudad:""
  
    }

    this.FiltrosService.extraer(this.jobs, '')
  }

}
