import { AuthService } from './../auth/auth.service';
import { Profile } from './../../models/profile/profile';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';

import { Injectable } from '@angular/core';
import { User } from "firebase/app";
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>;
  profilesList: AngularFireList<Profile>;

  constructor(private db: AngularFireDatabase, private auth:AuthService) {
  }

  searchUsers(firstName:string){

    this.profilesList = this.db.list("/profiles",query=>
    query.orderByChild('firstName')
    //.equalTo(firstName)
    .startAt(firstName)
    .endAt(firstName+"\uf8ff"));

      return this.profilesList.snapshotChanges()
  }

  getAuthenticatedProfile(){
    return this.auth.getAuthenticatedUser()
    .map(user=>user.uid)
    .mergeMap(uid=> this.db.object(`profiles/${uid}`).snapshotChanges())
    .map(profile=> ({$key: profile.key,... profile.payload.val()}));
  }

  getProfile(user:User){
    this.profileObject =this.db.object(`/profiles/${user.uid}`);
    return this.profileObject;
  }

  saveProfile(user: User, profile:Profile){
    this.profileObject =this.db.object(`/profiles/${user.uid}`);
    return this.profileObject.set(profile)
    .then(response=>true)
    .catch(error=>false);
  }

}
