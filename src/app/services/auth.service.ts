import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth  } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { concatMap, first, map, take } from 'rxjs/operators';
import { concat, forkJoin, from, observable, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { environment } from 'src/environments/environment';
import categorias from 'src/assets/Opciones/trabajos/categorias.json'


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
    return this.afs.collection('users').doc(id).collection('CVs').add(cv)
    
  }
  eliminarCV(id:string, id_cv:string){
    return this.afs.collection('users').doc(id).collection('CVs').doc(id_cv).delete()
  }
  obtenerCvs(id:string){
    return this.afs.collection('users').doc(id).collection('CVs').valueChanges({idField:'id'})
  }

  getAllUsers(){
    return this.afs.collection('users').valueChanges({idField: 'id'})
  }

  getUserConId(id:string){
    return this.afs.collection('users').doc(id).valueChanges({idField:'id'})
  }

  updateUser(id:string, data:any){
    return this.afs.collection('users').doc(id).set(data, {merge: true})
  }


  






  //Login con google

  // Firebase SignInWithPopup
  OAuthProvider(provider:any, tipo:string) {
    return this.afAuth.signInWithPopup(provider)
        .then((res) => {
            this.ngZone.run(() => {
              this.spinner.show()
              debugger;
              
              console.log(res)
              if(res){
                //detectar que tipo es la cuenta y redirigir
                this.getUserAfs(res.user?.uid || "")
                  .subscribe((user:any) => {
                    if(user.tipo){
                      this.spinner.hide()
                      this.router.navigate([user.tipo]);
                    }else{
                      //Crear tipo de cuenta
                      let estandar = categorias.find(categ => categ.categoria == "Estándar") 

                      let userNuevo:any = {
                        tipo: tipo.replace('/', ''), 
                        nombre:res.user?.displayName, 
                        admin: false,
                        email: res.user?.email,
                        avisos: estandar?.avisos,
                        usuarios: estandar?.usuarios
                      }
                      if(tipo.replace('/', '') == "empresa"){
                        userNuevo['categoria'] = "Estándar"
                      }
                      
                      from(this.saveUser(userNuevo, res.user?.uid || "")).pipe(take(1))
                      .subscribe(data => {
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
      url: environment.link_empresa
    };
    return user.sendEmailVerification(actionCodeSettings)

  }

  RecoverPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(
      email, 
      { url: environment.link_personal }); 
  }

 
}
