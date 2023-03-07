import { Injectable,  } from '@angular/core';
import { Query, AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service'
import categorias from 'src/assets/Opciones/trabajos/categorias.json'
import { Postulacion } from '../interfaces/postulacion.interface';
import { FiltrosService } from './filtros.service';
import { MiPerfilService } from './mi-perfil.service';


@Injectable({
  providedIn: 'root'
})
export class BusquedaUsuariosService {

  primerFiltro :boolean = false;
  segundoFiltro :boolean = false;


  constructor(
    private afs:AngularFirestore, 
    private AuthService:AuthService, 
    private filtros:FiltrosService,
    private MiPerfilService: MiPerfilService
    ) { }

  buscarUsuarios(puesto:string, params:any){
    
    return this.afs.collection('users', (ref) => {
      // Obligatorio
      let query : Query = ref;
      if(params.params.ciudad){
        query = query.where('tipo', '==', 'personal')
        .where('puesto','==', puesto)
        .where('pais','==', params.params.pais)
        .where('provincia', '==', params.params.provinciaQ)
        .where('ciudad', '==', params.params.ciudad)
      }

      if(params.params.provinciaQ){
        query = query.where('tipo', '==', 'personal')
        .where('puesto','==', puesto)
        .where('pais','==', params.params.pais)
        .where('provincia', '==', params.params.provinciaQ)
      }
      if(params.params.pais){
        query = query.where('tipo', '==', 'personal')
        .where('puesto','==', puesto)
        .where('pais','==', params.params.pais)
      }else{
        query = query.where('tipo', '==', 'personal').where('puesto','==', puesto)
      }
      

       return query
      })
    .valueChanges({idField:'id'})
    // .pipe(
    //   first(),
    //   map(data => {
    //     return data.filter((user:any) =>{
    //       if(user.idiomas){
    //         return user['idiomas'].filter((idioma:any) => idioma.idioma==params.params.idioma1)

    //       }
    //     })
    //   })
    // )
    
  }

  almacenarUsuarioRevelado(idUsuario:string,idUsuarioRevelado:string){
    return this.afs.collection('users').doc(idUsuario).collection('usuario_revelado').doc(idUsuarioRevelado).set({id:idUsuarioRevelado})
  }

  getUsuariosRevelados(idUsuario:string){
    return this.afs.collection('users').doc(idUsuario).collection('usuario_revelado').valueChanges({idField:'id'}).pipe(take(1))
  }


  getUsuariosReveladosSinId(){
    return this.AuthService.getUserAfsSinId().pipe(
      concatMap((user:any) => {
        const categoria = categorias.find(categoria => categoria.categoria == user.categoria)
        if(categoria){
          localStorage.setItem('categoria',JSON.stringify( categoria));
        }
        if(user){
          return this.getUsuariosRevelados(user.id)
        }else{
          return of(false)
        }
      })
    )
  }

  //  postulacionesFiltro(postulacionesFiltro){


  //  }


  // getPostulacionesFiltro(id_trabajo:string, filtros:any){

  //   return this.afs.collection("trabajos").doc(id_trabajo).collection<Postulacion[]>('postulaciones').valueChanges({ idField: 'id' })
  //   .pipe(
  //     first(),
  //     concatMap((postulaciones:any)=>{ 
  //       if(postulaciones){
  //         // return this.getUserAfs(user.uid)

  //         return this.filtrarUsers()
  //       }else{
  //         return of(false)
  //       }
  //     })
  //   );
  // }
  
  filtrarUsers(filtros:any){
    return this.afs.collection("users", (ref) => {
      // // Obligatorio
      let query : Query = ref;

 

      if(filtros.pais){
        query = query.where('pais','==', filtros.pais)
      }

      if(filtros.provincia){
        query = query.where('provincia', '==', filtros.provincia)
      }
      if(filtros.ciudad){
        query = query.where('ciudad', '==', filtros.ciudad)
      }

      //Rubro y puesto
      if(filtros.rubro){
        query = query.where('rubro', '==', filtros.rubro)
      }
      if(filtros.puesto){
        query = query.where('puesto', '==', filtros.puesto)
      }

      if(filtros.genero!=='Indistinto'){
        if(filtros.genero){
          query = query.where('genero', '==', filtros.genero)
        }
      }
      if(filtros.licencia){
        query = query.where('licencia', '==', filtros.licencia)
      }
      if(filtros.movilidad){
        query = query.where('movilidad', '==', filtros.movilidad)
      }
      if(filtros.discapacidad){
        query = query.where('discapacidad', '==', filtros.discapacidad)
      }

      //filtros ultimo CV
      if(filtros.ultimoCV!=='Indistinto' ){
        if(filtros.ultimoCV){
          let date = new Date()
          switch(filtros.ultimoCV){
            case 'Menor a 15 días':
              date.setDate(date.getDate() - 15);
              console.log(date.toLocaleDateString());
              break;
            case 'Menor a 1 mes':
              date.setMonth(date.getMonth() - 1);;
              console.log(date.toLocaleDateString());
              break;
            case 'Menor a 3 meses':
              date.setMonth(date.getMonth() - 3);;
              console.log(date.toLocaleDateString());
              break;
            case 'Menor a 6 meses':
              date.setMonth(date.getMonth() - 6);;
              console.log(date.toLocaleDateString());
              break;
            case 'Menor a 12 meses':
              date.setMonth(date.getMonth() - 12);;
              console.log(date.toLocaleDateString());
              break;
            case 'Menor a 18 meses':
              date.setMonth(date.getMonth() - 18);;
              console.log(date.toLocaleDateString());
              break;
          }
          query = query.where('ultimo_cv', '>=', date)
          this.primerFiltro = true;
        }
      }

       //Filtros edad
       if(filtros.edadMin && !this.primerFiltro){
        var fechaMin = this.filtros.getFechaLimite(filtros.edadMin)
        query = query.where('fecha_nacimiento.year', '<=' , fechaMin)
        this.segundoFiltro = true;
      }

      if(filtros.edadMax && !this.primerFiltro){
        var fechaMax = this.filtros.getFechaLimite(filtros.edadMax)
        query = query.where('fecha_nacimiento.year', '>=' , fechaMax)
        this.segundoFiltro = true;
      }

      //Filtros sueldo
      if(filtros.sueldoMin && !this.segundoFiltro && !this.primerFiltro){
        query = query.where('sueldo', '>=', filtros.sueldoMin)
        
      }
      if(filtros.sueldoMax && !this.segundoFiltro && !this.primerFiltro){
        query = query.where('sueldo', '<=', filtros.sueldoMax)
      }

    



      return query.where('tipo', '==', 'personal').limit(25)
      }).valueChanges({ idField: 'id' }).pipe(
        map((usuarios:any) => {
          var usuariosFiltrados = usuarios

          //Filtros edad
          if(this.primerFiltro){
            if(filtros.edadMin){
              var fechaMin = this.filtros.getFechaLimite(filtros.edadMin)
            //  query = query.where('fecha_nacimiento.year', '<=' , fechaMin)
              var usuariosFiltrados = usuariosFiltrados.filter((usuario:any) => (usuario.fecha_nacimiento?.year ? usuario.fecha_nacimiento.year <= fechaMin: false))
              // this.segundoFiltro = true;
            }
              
            if(filtros.edadMax){
              var fechaMax = this.filtros.getFechaLimite(filtros.edadMax)
              // query = query.where('fecha_nacimiento.year', '>=' , fechaMax)
              var usuariosFiltrados = usuariosFiltrados.filter((usuario:any) => (usuario.fecha_nacimiento?.year ? usuario.fecha_nacimiento.year >= fechaMax: false))
              // this.segundoFiltro = true;
            }
          }

          //Filtros sueldo
          if(this.segundoFiltro){

            if(filtros.sueldoMin){
              var usuariosFiltrados = usuariosFiltrados.filter((usuario:any) => (usuario.sueldo ? usuario.sueldo >= filtros.sueldoMin: false))
            }
            if(filtros.sueldoMax){
              var usuariosFiltrados = usuariosFiltrados.filter( (usuario:any) => (usuario.sueldo ? usuario.sueldo <= filtros.sueldoMax: false))
            }
          }

          return usuariosFiltrados
        })
      )
  }


  
  getAllUsersNotVerified(){
    
    return this.afs.collection('users', ref => ref.where('tipo','==', 'personal').where('verificado', '==', false)).valueChanges({idField:'idUser'})
    .pipe(
      concatMap(data => {
        
        const observables: Observable<any>[] = [];
        data.forEach((user, index) => {
          observables.push(  this.MiPerfilService.leerDatosContacto(user.idUser).pipe(
            map(userData => {
              return { ...data[index], ...userData[0]}
            }))
          )});
          
        return combineLatest(observables);
      })
    )
    
    
  }
    

  




}
