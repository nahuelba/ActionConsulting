import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SubirCvService {

  constructor(    private storage: AngularFireStorage) { }


  
  //Tarea para subir archivo
  subirCV(nombre: string, pdf: any, formato:string) {
    return this.storage.upload('CVs/ ' + nombre + formato, pdf);
  }

  //Referencia del archivo
  ObtenerPDF(nombreArchivo: string, formato:string) {
    return this.storage.ref('CVs/ ' + nombreArchivo + formato).getDownloadURL()
  }

  deleteDocument(nombreArchivo: string, formato:string){
    return this.storage.ref('CVs/ ' + nombreArchivo + formato).delete()
  }
}
