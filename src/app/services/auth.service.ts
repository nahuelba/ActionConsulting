import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth  } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth:any


  constructor(
    public afAuth: AngularFireAuth, 
    private afs:AngularFirestore,
    private storage: AngularFireStorage
    ) { }


  async login(email:string, password:string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, password)
    }catch(err){
      console.log("Error: ", err);
      return err;

    }
  }

  async register(email:string, password:string){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch(err){
      return err;

    }
  }


  getUserLogged(){
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.signOut();
  }


  saveUser(id:string, tipo:string){
    this.afs.collection('users').add({user: id, tipo:tipo})
  }

  getUser(){
    return this.afs.collection('users').valueChanges();
  }


  // //Tarea para subir archivo
  // subirFotoPerfil(NombreFoto: string, datos: any) {
  //   return this.storage.upload('fotos_perfiles/ ' + NombreFoto, datos);
  // }

  // //Referencia del archivo
  // ObtenerPDF(nombreArchivo: string) {
  //   return this.storage.ref(nombreArchivo).getDownloadURL();
  // }

 
}
