import { AuthService } from './../../providers/auth/auth.service';
import { DataService } from './../../providers/data/data.service';
import { Profile } from './../../models/profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { User } from "firebase/app";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  private  authenticatedUser$: Subscription;
  private authenticatedUser: User;
  profile= {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data:DataService, private auth:AuthService) {
    this.authenticatedUser$ = auth.getAuthenticatedUser().subscribe(user=>{
      this.authenticatedUser= user;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfile(){
    if(this.authenticatedUser){
      this.profile.email= this.authenticatedUser.email;
      this.data.saveProfile(this.authenticatedUser, this.profile)
      .then(response=>{
        console.log(response);
      })
    }
  }

}
