import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { experiencia_laboral } from '../interfaces/experiencia.interface';
import { formacion } from '../interfaces/formacion.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MiPerfilService {

  constructor(
    private afs:AngularFirestore, 
    private AuthService:AuthService,
    private storage: AngularFireStorage
    ) { }

  agregarExperienciaLaboral(idUser:string, experiencia_laboral:experiencia_laboral){
    return this.afs.collection('users').doc(idUser).collection('experiencias_laborales').add(experiencia_laboral)
  }

  leerExperienciasLaborales(idUser:string){
    return this.afs.collection('users').doc(idUser).collection('experiencias_laborales').valueChanges({ idField:'id' })
  }

  updateExperiencia(idUser:string, idExperiencia:string, data:experiencia_laboral){
    return this.afs.collection('users').doc(idUser).collection('experiencias_laborales').doc(idExperiencia).set(data)
  }

  eliminarExperiencia(idUser:string, idExperiencia:string){
    return this.afs.collection('users').doc(idUser).collection('experiencias_laborales').doc(idExperiencia).delete()
  }



  agregarFormacion(idUser:string, formacion:formacion){
    return this.afs.collection('users').doc(idUser).collection('formaciones').add(formacion)
  }

  leerFormacion(idUser:string){
    return this.afs.collection('users').doc(idUser).collection('formaciones').valueChanges({ idField:'id' })
  }

  updateFormacion(idUser:string, idExperiencia:string, formacion:formacion){
    return this.afs.collection('users').doc(idUser).collection('formaciones').doc(idExperiencia).update(formacion)
  }

  eliminarFormacion(idUser:string, idExperiencia:string){
    return this.afs.collection('users').doc(idUser).collection('formaciones').doc(idExperiencia).delete()
  }


  agregarDatosContacto(idUser:string, data:any){
    return this.afs.collection('users').doc(idUser).collection('datos_contacto').add(data)  
  }

  leerDatosContacto(idUser:string){
    return this.afs.collection('users').doc(idUser).collection('datos_contacto').valueChanges({ idField:'id' }).pipe(take(1))
  }
  updateDatosContacto(idUser:string, id_datos_contacto:string, data:any){
    return this.afs.collection('users').doc(idUser).collection('datos_contacto').doc(id_datos_contacto).update(data)
  }



  updateUserUsuariosRevelados(idUser:string, idUsuarioRevelado:string ,data:any){
    return this.afs.collection('users').doc(idUser).collection('usuarios_revelados').doc(idUsuarioRevelado).set(data, {merge: true})
  }

  eliminarUsuarioRevelado(usuario_revelado:string){
    return this.AuthService.getUserLogged().pipe(
      concatMap((user:any)=>{ 
        if(user){
          return this.afs.collection('users').doc(user.uid).collection('usuarios_revelados').doc(usuario_revelado).delete()
        }else{
          return of(false)
        }
      }),
      take(1)
    );
  }

  leerUserUsuariosRevelados(){
    return this.AuthService.getUserLogged().pipe(
      concatMap((user:any)=>{ 
        if(user){
          return this.afs.collection('users').doc(user.uid).collection('usuarios_revelados').valueChanges({ idField:'id' }).pipe(take(1))
        }else{
          return of(false)
        }
      }),
      take(1)
    );

  }



  //Subir foto de perfil
  subirFoto(email:string, nombre: string, foto: any, formato:string) {
    return this.storage.upload( email + '/foto/' + nombre + formato, foto);
  }

  //Referencia del archivo
  ObtenerFoto(email:string, nombreArchivo: string, formato:string) {
    return this.storage.ref(email + '/foto/' + nombreArchivo + formato).getDownloadURL()
  }
  deleteAllFolder(email:string){
    return this.storage.ref(email + '/foto/').listAll();
   
  }

  
}
