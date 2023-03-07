import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { take } from 'rxjs/operators';
import { ModalFiltrosComponent } from 'src/app/components/modal-filtros/modal-filtros.component';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaUsuariosService } from 'src/app/services/busqueda-usuarios.service';
import { FiltrosService } from 'src/app/services/filtros.service';
import { MiPerfilService } from 'src/app/services/mi-perfil.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { PostulacionComponent } from './postulacion/postulacion.component';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css'],
})
export class PostulacionesComponent implements OnInit {
  id_trabajo: string | null = '';

  postulaciones: any[] = [];

  hoy = new Date().getFullYear();

  avisos: boolean = false;

  filtros: any;

  idSeleccionado: any;

  usuarios:any

  @ViewChild('postulacion') postulacion!: PostulacionComponent;

  constructor(
    private route: ActivatedRoute,
    public PostulacionService: PostulacionService,
    private AuthService: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private BusquedaUsuarioService: BusquedaUsuariosService,
    public filtrosService: FiltrosService,
    private MiPerfilService: MiPerfilService,
    private spinner:NgxSpinnerService,
    private titleService: Title
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.id_trabajo = this.route.snapshot.paramMap.get('id');

    this.MiPerfilService.leerUserUsuariosRevelados().subscribe(
      (usuarios: any) => {
        console.log('usuarios revelados', usuarios);
        
        //verificar que los usuarios revelados no pasen los 30 dias, en caso contrario eliminar
        this.usuarios = usuarios.filter((usuario:any) =>{
          debugger;
          let now = new Date(); //calculamos fecha de hoy
          let ts = new Date(usuario.fecha_revelado.seconds * 1000); //calculamos la fecha de la publicacion
          let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos

          //Eliminar usuario revelado de firebase si es mayor a 30 dias
          if(diff > 2592000000){  
            this.MiPerfilService.eliminarUsuarioRevelado(usuario.id)
            .subscribe(console.log)
          } 
          return diff < 2592000000 //calculamos si la fecha es menor a 30 dias (en milisegundos)

        })  

    
        if (this.id_trabajo) {
          this.titleService.setTitle('Postulaciones del aviso | ACTION HUMAN CAPITAL CONSULTING');

          this.avisos = true;

          this.PostulacionService.getPostulaciones(
            this.id_trabajo || ''
          ).subscribe((postulaciones: any) => {
      
            console.log(postulaciones);
            this.postulaciones = []

            postulaciones.forEach((postulacion: any, index: number, object:any) => {
              this.AuthService.getUserAfs(postulacion.user)
              .subscribe(
                (user: any) => {
                  if(user.verificado==false){
                    object.splice(index, 1);
                  }else{
                    postulacion['user'] = user;
                    this.RevelarUsuario(postulacion)
                  }
                }
              );

            });
          });
        } else {
          this.titleService.setTitle('Busqueda general | ACTION HUMAN CAPITAL CONSULTING');

          // this.postulaciones = usuarios;
          this.AuthService.getAllUsersPersonalVerificados()
          .subscribe((users: any) => {
            this.postulaciones = []
            users.forEach((user: any) => {
              user['user'] = user;
              this.RevelarUsuario(user)
             
            });
          });
        }
        console.log('postulaciones', this.postulaciones);
      }
    );
  }

  abrirFiltros() {
    const modalRef = this.modalService.open(ModalFiltrosComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.filtros = this.filtros;
    modalRef.result.then(
      (filtros) => {
        this.postulacion.reiniciarUsuario();
        console.log(filtros.value);
        if (filtros) {
          this.filtros = filtros.value;

          

          // Si es busqueda general
          if (!this.avisos) {
            this.BusquedaUsuarioService.filtrarUsers(this.filtros).pipe(take(1)).subscribe(
              (users) => {
                this.postulaciones = []
                users.forEach((user: any) => {
                  user['user'] = user;
                  this.RevelarUsuario(user)
                });
              }
            );
          }
        }
      },
      () => console.log('cerrado')
    );
  }

  limpiarFiltro(filtro: any) {
    console.log(filtro);
    if(filtro=="ultimoCV" || filtro =="genero"){
      this.filtros[filtro] = 'Indistinto';
    }else{

      this.filtros[filtro] = '';
    }
    if (!this.avisos) {
      this.BusquedaUsuarioService.filtrarUsers(this.filtros).subscribe(
        (users) => {
          this.postulaciones = []
          users.forEach((user: any) => {
            user['user'] = user;
            this.RevelarUsuario(user)
          });
          // this.postulaciones = users;
        }
      );
    }
  }

  cargarUsuario(postulacion: any) {
    this.idSeleccionado = postulacion.user.id;
    this.postulacion.reiniciarUsuario();
    this.postulacion.obtenerDatosUsuario(postulacion.user.id);

    if(postulacion['nombre']){
      this.spinner.show()
      this.postulacion.leerDatosContacto();
    }
  }

  revelarNombre(data: any) {
    console.log(this.postulaciones);

    this.postulaciones.forEach((postulacion: any) => {
      if (postulacion.user.id == data.id) {
        postulacion['nombre'] = data.nombre;
      }
    });
  }




  RevelarUsuario(user:any){

     // verificar si usuario esta revelado
     this.usuarios.forEach((usuario:any) => {
      if (usuario.id == user.id) {
        //Revelar usuario (que ya estaba revelado)
        this.MiPerfilService.leerDatosContacto(user.id)
        .subscribe(datosContacto => {
          user['nombre'] = datosContacto[0]['nombre']
        })
        user = { ...user, ...usuario}
      }
    });

    this.postulaciones.push(user);
  }
}
