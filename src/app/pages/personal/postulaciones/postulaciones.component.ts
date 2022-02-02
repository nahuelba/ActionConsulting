import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service'

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  lugares:any[] = []

  user:any;
  postulaciones:any[] = [];

  loader=true;

  constructor(
    private CardService:CardService,  
    private PostulacionService:PostulacionService,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Postulaciones | ACTION HUMAN CAPITAL CONSULTING');

    // this.getJobs()
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
    console.log(this.user)
    this.PostulacionService.getPostulacionUser(this.user.uid)
    .subscribe((postulaciones) => {
      postulaciones.forEach((postulacion:any) => {
        this.CardService.getDocumentById(postulacion.trabajo)
        .subscribe(trabajo => {
          postulacion['trabajo'] = trabajo
        })
      })
      this.postulaciones= postulaciones
      
      this.loader=false
      console.log(this.postulaciones)

    })
   
    
  }

}
