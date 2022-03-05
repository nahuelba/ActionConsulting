import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
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

  empresa:boolean = false;

  search= new FormGroup({
    puesto: new FormControl(""),
    lugar: new FormControl("Lugar de Trabajo")
  })


  foto_perfil:string = ""
 

  constructor(
    private authService: AuthService,
    private router: Router, 
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {

    this.authService.getUserLogged().subscribe(
      res=> {
        if(res!==null){
          this.authService.getUserAfs(res.uid)
          .subscribe((user:any) => {
            
            this.foto_perfil = user.foto
            if(user.tipo=="empresa"){
              this.empresa= true;
            }
            delete user['admin']
            this.user={ ...res, datos:user}
            
            this.sendUser.emit(this.user!);
          })

        }else{
          this.user=null
        }
      }
    )


  }


  logout(){
    this.spinner.show()
    this.authService.logout()
    .then(data => {
      this.spinner.hide()
      this.router.navigate(['/personal'])
    })
    this.user=""
    
  }


 

}
