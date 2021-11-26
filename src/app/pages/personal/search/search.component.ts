import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobs!:job[];
  lugares:any[] = []

  puesto:string | null = "";
  lugar!:string | null;

  loader:boolean=true;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    
    
   //Get Id from url
   this.puesto = this.route.snapshot.paramMap.get('puesto');

   this.lugar = this.route.snapshot.paramMap.get('lugar');


   if(this.puesto){
    
    this.puesto = this.puesto.split('-').join(' ')
   }

   if(this.lugar){
    this.lugar = this.lugar.split('-').join(' ')
   }

   this.getJobs()


  }

  getJobs(){
    this.cardService.getCards()
    .subscribe(
      data=>{

        this.jobs=data.filter(job => job.puesto.toLowerCase().includes(this.puesto!))
        this.loader=false;
        if(this.lugar!="todo el país"){

          this.jobs=this.jobs.filter(job => job.lugar.toLowerCase().includes(this.lugar!))
        }
        //Extraer lugares
        let arrayLugares:any = []
        this.jobs.forEach(e => {arrayLugares.push(e.lugar) })

        this.lugares = this.cardService.removeDuplicates(arrayLugares)

      },
      err=>console.log(err),

      
     
    )
  }


   

  

}
