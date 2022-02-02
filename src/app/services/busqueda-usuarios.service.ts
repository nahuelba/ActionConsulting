import { Injectable,  } from '@angular/core';
import { Query, AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { concatMap, first, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service'
import categorias from 'src/assets/Opciones/trabajos/categorias.json'


@Injectable({
  providedIn: 'root'
})
export class BusquedaUsuariosService {

  constructor(private afs:AngularFirestore, private AuthService:AuthService) { }

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




}
