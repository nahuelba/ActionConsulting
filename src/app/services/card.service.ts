import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { job } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private firestore: AngularFirestore) { }

  
  getCards() {
    return this.firestore.collection<job>('empresas').valueChanges({ idField: 'id' });
  }
  getDocumentById(id:string){
    return this.firestore.collection('empresas').doc(id).ref.get()
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
}
