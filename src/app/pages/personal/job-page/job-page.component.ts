import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { Postulacion } from 'src/app/interfaces/postulacion.interface'

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {

  job:any

  user:string="";

  id:string="";

  Postulado:boolean=false

  loader=true;

  cvCargado = false;


  postulacion:Postulacion={
    email:"",
    fecha:new Date(),
    trabajo:"",
    cv: ""
  };

  constructor(
    private CardService: CardService,
    private route: ActivatedRoute,
    private PostulacionService: PostulacionService,
    private router: Router, 
    ) { }

  ngOnInit(): void {
    //Get Id from url
    let id:any = this.route.snapshot.paramMap.get('id');

    this.id=id

    


    //Consult Firebase with id
    this.CardService.getDocumentById(id)
    .subscribe( (job) => {
    
        this.job=job;
        console.log(this.job);
        this.loader=false;
 
    })

  

    this.postulacion.trabajo=id
   
  }

  checkUser(user:any){
    console.log(user)
    this.user=user;
    // debugger
    this.postulacion.email=user.email

    //verificar si esta postulado
    this.PostulacionService.getPostulaciones()
    .subscribe(
      data=>{
        let VerificarPostulacion = data.filter((post:any) =>post['email']==user.email && post['trabajo']==this.id)

        VerificarPostulacion.length === 0 ? this.Postulado=false:this.Postulado=true;
     
      },
      err=>console.log(err)
    )
  }


  Postulacion(){
    console.log(this.postulacion)
    this.PostulacionService.RealizarPostulacion(this.postulacion)
    .then(res => {
      console.log(res);
      this.ngOnInit()
      this.Postulado=true;
    })
    .catch(e => {
      console.log(e);
    })
    
  }

  onFileChange(e:any){
    console.log(e.files.item(0))
    if(e.files.item(0)){
      if(e.files.item(0).type == "application/pdf"){
        this.postulacion.cv = e.files.item(0).name
        this.cvCargado=true;
  
        
      }else{
        this.cvCargado=false;
      }
    }else{
      this.cvCargado=false;
    }
  }

}
