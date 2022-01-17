import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Postulacion } from '../interfaces/postulacion.interface';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private firestore: AngularFirestore, private CardService:CardService) { }

  

  RealizarPostulacion(postulacion:Postulacion){
    return this.firestore.collection("postulacion").add(postulacion)
  }

  getPostulaciones() {
    return this.firestore.collection<Postulacion[]>('postulacion').valueChanges({ idField: 'id' });
  }

  verificarPostulacion(user:string, trabajo:string){
    return this.firestore.collection<Postulacion[]>('postulacion', ref => ref.where("user", "==", user).where("trabajo", "==", trabajo)).valueChanges({ idField:'id' });
  }


  getPostulacion(id:string | undefined){
    return this.firestore.collection('postulacion', ref => ref.where("trabajo", '==', id)).valueChanges({ idField: 'id' })
  }


  getPostulacionUser(user:string){
    return this.firestore.collection('postulacion', ref => ref.where('user', '==', user).orderBy('fecha', 'desc')).valueChanges()
  }


 
}
