import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { job } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {



  expiracion = new Date(new Date().setDate(new Date().getDate() - 30));
  constructor(private firestore: AngularFirestore) { }
  
  getCardsPublicadas() {
    return this.firestore.collection<job>('trabajos', ref => ref
    .where('estado', '==', 'Publicado')
    .where('fecha_publicacion', '>', this.expiracion)
    .orderBy('fecha_publicacion', 'desc'))
    .valueChanges({ idField: 'id' });
  }

  getCardsDelUsuario(user:string) {
    return this.firestore.collection<job>('trabajos', ref => ref.where('empresa_id', '==', user).orderBy('fecha_publicacion', 'desc')).valueChanges({ idField: 'id' })
    .pipe(
      map(trabajos => {
          // Si es menor a 30 dias setear trabajo finalizado 
          trabajos.forEach( job => {
            if(job.estado!=="Finalizado"){
            var milisegundos = 2592000000
            let now = new Date(); //calculamos fecha de hoy
            let ts = new Date(job.fecha_publicacion.seconds * 1000); //calculamos la fecha de la publicacion
            let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos
            
            if(diff > milisegundos){
              console.log(job.puesto + ' es mayor a 30 dias')
              this.actualizarTrabajo(job.id, {estado:'Finalizado'});
            } //calculamos si la fecha es menor a xx dias (en milisegundos)
          }
          })
          return trabajos
      })
    
    )
  }

  getAllCards(){
    return this.firestore.collection<job>('trabajos', ref => ref.orderBy('fecha_publicacion', 'desc')).valueChanges({idField:'id'})
    .pipe(
      map(trabajos => {
          // Si es menor a 30 dias setear trabajo finalizado 
          trabajos.forEach( job => {
            if(job.estado!=="Finalizado"){
            var milisegundos = 2592000000
            let now = new Date(); //calculamos fecha de hoy
            let ts = new Date(job.fecha_publicacion.seconds * 1000); //calculamos la fecha de la publicacion
            let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos
            
            if(diff > milisegundos){
              console.log(job.puesto + ' es mayor a 30 dias')
              this.actualizarTrabajo(job.id, {estado:'Finalizado'});
            } //calculamos si la fecha es menor a xx dias (en milisegundos)
          }
          })
          return trabajos
      })
    
    )
  }

  getDocumentById(id:string){
    return this.firestore.collection<job>('trabajos').doc(id).valueChanges({ idField: 'id' })
  }


  actualizarTrabajo(id:string | undefined, trabajo:any){
    return this.firestore.collection<job>('trabajos').doc(id).update(trabajo)
            
  }

  eliminarTrabajo(id:string | undefined){
    return this.firestore.collection('trabajos').doc(id).delete()
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
