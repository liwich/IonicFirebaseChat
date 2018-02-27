import { LoadingService } from './../../providers/loading/loading.service';
import { ToastService } from './../../providers/toast/toast.service';
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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private data:DataService, 
    private auth:AuthService,
    private toast:ToastService,
    private loader:LoadingService) {
    this.authenticatedUser$ = auth.getAuthenticatedUser().subscribe(user=>{
      this.authenticatedUser= user;
    })
  }

  ionViewDidLoad() {
  }

  saveProfile(){
    if(this.authenticatedUser){
      this.loader.show();
      this.profile.email= this.authenticatedUser.email;
      this.data.saveProfile(this.authenticatedUser, this.profile)
      .then(response=>{
        this.loader.hide();
        if(response){
          this.navCtrl.setRoot("TabsPage");
        }else{
          this.toast.show("There is an error saving the information, please try again");
        }
      })
    }
  }

}
