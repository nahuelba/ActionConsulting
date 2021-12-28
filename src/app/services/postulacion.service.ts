import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Postulacion } from '../interfaces/postulacion.interface';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private firestore: AngularFirestore) { }

  

  RealizarPostulacion(postulacion:Postulacion){
    return this.firestore.collection("postulacion").add(postulacion)
  }

  getPostulaciones() {
    return this.firestore.collection<Postulacion[]>('postulacion').valueChanges({ idField: 'id' });
  }


  getPostulacion(id:string){
    return this.firestore.collection('postulacion', ref => ref.where("trabajo", '==', id)).valueChanges({ idField: 'id' })
  }
}
