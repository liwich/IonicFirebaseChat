import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
  }


  getAuthenticatedUser (){
    return this.afAuth.authState;
  }

  signInWithEmailAndPassword(email:string, password:string){
      return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(response=>{
        if(response.uid){
          return response;         
        }
      })
      .catch(error=>error)
  }

  registerWithEmailAndPassword(email:string, password:string){
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(response=>response)
    .catch(error=>error);
  }

  signOut(){
    return this.afAuth.auth.signOut();
  }

}
