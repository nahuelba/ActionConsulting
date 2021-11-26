import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import { AngularFireAuth  } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afAuth: AngularFireAuth) { }


  async login(email:string, password:string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, password);
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

 
}
