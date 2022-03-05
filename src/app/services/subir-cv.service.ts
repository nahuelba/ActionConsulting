import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { combineLatest, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubirCvService {

  constructor(    private storage: AngularFireStorage, private authService:AuthService) { }


  
  //Tarea para subir archivo
  subirCV(email:string, nombre: string, pdf: any, formato:string) {
    return this.storage.upload( email + '/CVs/' + nombre + formato, pdf);
  }

  //Referencia del archivo
  ObtenerPDF(email:string, nombreArchivo: string, formato:string) {
    return this.storage.ref(email + '/CVs/' + nombreArchivo + formato).getDownloadURL()
  }

  

  deleteDocument(email:string, nombreArchivo: string, formato:string){
    return this.storage.ref(email + '/CVs/' + nombreArchivo + formato).delete()
  }

  obtenerCVSconId(id:string, email:string){
    return this.authService.obtenerCvs(id).pipe(
      concatMap((cvs:any)=>{
        if(cvs.length!=0){
          let observables:any[] = []
          cvs.forEach((cv:any) => {
            
            observables.push(this.ObtenerPDF(email, cv.nombre, cv.tipo))
          });
          
          return combineLatest(observables)

        }else{
          return of(false)
        }
      })
    );
  }
}
