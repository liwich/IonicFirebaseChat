import { Profile } from './../../models/profile/profile';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from "firebase/app";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>;

  constructor(private db: AngularFireDatabase) {
  }

  saveProfile(user: User, profile:Profile){
    this.profileObject =this.db.object(`/profiles/${user.uid}`);
    return this.profileObject.set(profile)
    .then(response=>true)
    .catch(error=>false);
  }

}
