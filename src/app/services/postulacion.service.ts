import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, forkJoin, of } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { Postulacion } from '../interfaces/postulacion.interface';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  

  constructor(private firestore: AngularFirestore, private CardService:CardService) { }

  

  RealizarPostulacion(postulacion:Postulacion, id_trabajo:string){
    return this.firestore.collection("trabajos").doc(id_trabajo).collection("postulaciones").doc(postulacion.user).set(postulacion)
  }

  getPostulaciones(id_trabajo:string) {
    return this.firestore.collection("trabajos").doc(id_trabajo).collection<Postulacion[]>('postulaciones').valueChanges({ idField: 'id' }).pipe(take(1));
  }

  verificarPostulacion(id_trabajo:string, user:string){
    return this.firestore.collection("trabajos").doc(id_trabajo).collection<Postulacion[]>('postulaciones', ref => ref.where("user", "==", user)).valueChanges({ idField:'id' });
  }


  getPostulacion(id_trabajo:string, id_postulacion:string | undefined){
    return this.firestore.collection('trabajos').doc(id_trabajo).collection('postulaciones', ref => ref.where("user", "==", id_postulacion)).valueChanges({ idField: 'id' })
  }


  getPostulacionUser(userId:string){
    return this.firestore.collection('users').doc(userId).collection('postulaciones').valueChanges({idField: 'id'})
  }

  AgregarPostulacion(userId:string, postulacion:any){
    return this.firestore.collection('users').doc(userId).collection('postulaciones').add(postulacion)
  }

  


 
}
