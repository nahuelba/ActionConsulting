import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { experiencia_laboral } from '../interfaces/experiencia.interface';
import { formacion } from '../interfaces/formacion.interface';


@Injectable({
  providedIn: 'root'
})
export class MiPerfilService {

  constructor( private afs:AngularFirestore) { }

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
}
