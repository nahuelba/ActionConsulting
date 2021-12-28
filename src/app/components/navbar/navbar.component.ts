import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() puestoForm=true;
  @Input() lugares:any;
  @Output()  sendUser = new EventEmitter<string>();
  

  user: any;

  search= new FormGroup({
    puesto: new FormControl(""),
    lugar: new FormControl("Lugar de Trabajo")
  })


 

  constructor(
    private authService: AuthService,
    private router: Router, 
  ) {}

  ngOnInit(): void {

    this.authService.getUserLogged().subscribe(
      res=> {
        console.log(res)
        if(res!==null){
          this.user= res

        }else{
          this.user=null
        }
        this.sendUser.emit(this.user!);
      }
    )


  }


  logout(){
    this.authService.logout()
    this.user=""
    this.router.navigate(['personal'])
  }

  Buscar(){
    console.log(this.search)

    let puesto:string =this.search.value.puesto.replaceAll(' ', '-').toLowerCase()
    if( this.search.value.lugar=="Lugar de Trabajo"){
      var lugar="todo-el-país"
    }else{
      var lugar:string = this.search.value.lugar.replaceAll(' ', '-').toLowerCase()
    } 

    this.redirectTo(`personal/search/${puesto}/${lugar}`);

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

 

}
