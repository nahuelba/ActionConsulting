import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth  } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { concatMap, first, map } from 'rxjs/operators';
import { concat, forkJoin, observable, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user:any


  constructor(
    public afAuth: AngularFireAuth, 
    private afs:AngularFirestore,
    public ngZone: NgZone,
    private router:Router,
    private spinner:NgxSpinnerService

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
    return this.afAuth.authState
  }
  logout(){
    return this.afAuth.signOut();
  }


  saveUser(user:any, id:string){
    return this.afs.collection('users').doc(id).set(user)
  }

  getUserAfs(id:string){
    return this.afs.collection('users').doc(id).valueChanges({ idField: 'id' })
    
  }
  getUserAfsSinId(){
    return this.getUserLogged().pipe(
      concatMap((user:any)=>{ 
        if(user){
          return this.getUserAfs(user.uid)

        }else{
          return of(false)
        }
      })
    );
  }

  getAllEmpresas(){
    return this.afs.collection('users', ref => ref.where('tipo','==', 'empresa')).valueChanges({idField: 'id'})
  }

  updateCV(id:string, cv:any){
    return this.afs.collection('users').doc(id).update({cv})
    
  }





  //Login con google

  // Firebase SignInWithPopup
  OAuthProvider(provider:any, tipo:string) {
    return this.afAuth.signInWithPopup(provider)
        .then((res) => {
            this.ngZone.run(() => {
              this.spinner.show()
              
              console.log(res)
              if(res){
                //detectar que tipo es la cuenta y redirigir
                this.getUserAfs(res.user?.uid || "")
                  .subscribe((user:any) => {
                    if(user.length>0){
                      this.spinner.hide()
                      this.router.navigate([user.tipo]);
                    }else{
                      //Crear tipo de cuenta
                      const userNuevo = {
                        tipo: tipo.replace('/', ''), 
                        nombre:res.user?.displayName, 
                        admin: false
                      }
                      this.saveUser(userNuevo, res.user?.uid || "")
                      .then(data => {
                        this.spinner.hide()
                        this.router.navigate([tipo])
                      } )
                      
                    }
                  }) 

              }
            })
        }).catch((error) => {
            window.alert(error)
        })
}

  // Firebase Google Sign-in
  SigninWithGoogle(tipo:string) {
      return this.OAuthProvider(new firebase.auth.GoogleAuthProvider(), tipo)
          .then((res:any) => {
              console.log('Successfully logged in!')
          }).catch((error:any) => {
              console.log(error)
          });
  }
//    // Firebase Facebook Sign-in
//    SigninWithFacebook() {
//     return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
//         .then((res:any) => {
//             console.log('Successfully logged in!')
//         }).catch((error:any) => {
//             console.log(error)
//         });
// }

  // Verificar correo
  verifyEmail(user:any) {
    var actionCodeSettings = {
      url: 'http://localhost:4200/empresa'
    };
    return user.sendEmailVerification(actionCodeSettings)

  }

  RecoverPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(
      email, 
      { url: 'http://localhost:4200/personal' }); 
  }

 
}
