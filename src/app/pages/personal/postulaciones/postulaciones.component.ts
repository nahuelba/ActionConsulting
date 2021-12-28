import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service'

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  lugares:any[] = []

  user:string="";

  postulaciones:any[] = [];

  loader=true;

  constructor(
    private CardService:CardService,  
    private PostulacionService:PostulacionService
    ) { }

  ngOnInit(): void {
    this.getJobs()
  }


  getJobs(){
    // this.CardService.getCards()
    // .subscribe(
    //   data=>{
    //     let arrayLugares:any = []
    //     // data.forEach(e => {arrayLugares.push(e.provincia) })

    //     this.lugares = this.CardService.removeDuplicates(arrayLugares)
    //   },
    //   err=>console.log(err)
    // )
  }




  checkUser(user:string){
    this.user=user;

    //verificar si esta postulado
    // this.PostulacionService.getPostulaciones()
    // .subscribe(
    //   data=>{
    //     var dataPostulaciones:any = data.filter((post:any) =>post['email']==this.user)

    //     this.CardService.getCards()
    //     .subscribe(data =>{ 

    //       data.forEach(e => {
    //         dataPostulaciones.forEach((postulacion:any) => {
    //           if(e.id==postulacion.trabajo){
    //             this.postulaciones.push({...e, ...postulacion})
    //           }
    //         })
    //       })
    //     })

    //     this.loader=false;
     
    //   },
    //   err=>console.log(err)
    // )
  }

}
