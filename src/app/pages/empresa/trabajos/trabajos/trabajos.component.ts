import { Component, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostulacionService } from 'src/app/services/postulacion.service';


@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {

  jobs: job[] = [];

  loader: boolean = true;

  filter: string = '';

  constructor(
    private CardService: CardService,
    private AuthService: AuthService,
    private PostulacionService:PostulacionService,

  ) {}

  ngOnInit(): void {

    // // console.log(myData)
    // const provincias:any =[]
    // const lista:any = []
    // myData.forEach((data:any) => {

    //   if(provincias.some((provincia:any) => provincia.provincia === data.admin_name)){
       
    //   }else{
    //     provincias.push({
    //               provincia: data.admin_name,
    //               ciudades:[
    //               ]
    //             })
    //   }
      
    //  })

    //  myData.forEach( data => {
    //    provincias.forEach((provincia:any) => {
    //      if(data.admin_name==provincia.provincia){
    //       provincia['ciudades'].push(data.city)
    //      }
    //    })
    //  })
    
    // console.log(provincias)
    

    this.AuthService.getUserLogged().subscribe((user: any) => {

    this.CardService.getCardsDelUsuario(user.uid).subscribe((jobs: job[]) => {
      
        this.jobs = jobs
        // this.jobs.forEach(job => {
        //   this.PostulacionService.getPostulacion(job.id)
        //   .subscribe(postulacion => job['postulaciones'] = postulacion)
        // })
        console.log(this.jobs)
        this.loader = false;
      });

    });
  }
}
