import { LoadingService } from './../../providers/loading/loading.service';
import { Profile } from './../../models/profile/profile';
import { User } from 'firebase/app';
import { AuthService } from './../../providers/auth/auth.service';
import { DataService } from './../../providers/data/data.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage  implements OnInit{


  private  authenticatedUser$: Subscription;
  private authenticatedUser: User;
  private profile$: Subscription;

  profile={} as Profile;
  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private data: DataService,
    private loader: LoadingService,
    private auth: AuthService) {
    }

    ngOnInit(): void {
      this.loader.show();
      this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe(
        (user:User)=>{
          this.authenticatedUser= user;
          this.loader.hide();
          this.profile$ = this.data.getProfile(user).snapshotChanges().subscribe((profile)=>{
            this.profile = profile.payload.val()
          })
        }
      )
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

    signOut(){
      this.profile$.unsubscribe();
      this.authenticatedUser$.unsubscribe();
      this.auth.signOut().then(response => {
        this.navCtrl.setRoot("LoginPage");
      })
    }


}
