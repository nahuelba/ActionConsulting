import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { job } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {


  constructor(private firestore: AngularFirestore) { }

 
  
  getCardsPublicadas() {
    return this.firestore.collection<job>('trabajos', ref => ref.where('estado', '==', 'Publicado').orderBy('fecha_publicacion', 'desc')).valueChanges({ idField: 'id' });
  }

  getCardsDelUsuario(user:string) {
    return this.firestore.collection<job>('trabajos', ref => ref.where('empresa_id', '==', user).orderBy('fecha_publicacion', 'desc')).valueChanges({ idField: 'id' });
  }

  getDocumentById(id:string){
    return this.firestore.collection('trabajos').doc(id).valueChanges({ idField: 'id' })
  }

    // Removes duplicates from an array and returns an object
  // with a count of the members
  removeDuplicates(arr:any) {
    var result:any = {};
    var i = arr.length;

    while (i--) {

      // If member is a duplicate, increment count and delete it      
      if (result.hasOwnProperty(arr[i])) {
        result[arr[i]]++;
        arr.splice(i, 1);

      // Otherwise, just add it to the results 
      } else {
        result[arr[i]] = 1;
      }
    }

    // convert results to the desired object format
    return Object.keys(result).map(function (p){return {id: p, count: result[p]};});
  }

  setTrabajo(trabajo:job){
    return this.firestore.collection('trabajos').add(trabajo)
  }



  
}
