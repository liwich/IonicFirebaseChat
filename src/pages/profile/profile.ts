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

  profile={} as Profile;
  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private data: DataService,
    private loader: LoadingService,
    private auth: AuthService) {

      this.authenticatedUser$ = auth.getAuthenticatedUser().subscribe(user=>{
        this.authenticatedUser= user;
      })
    }

    ngOnInit(): void {
      this.loader.show();
      this.auth.getAuthenticatedUser().subscribe(
        (user:User)=>{
          this.loader.hide();
          this.data.getProfile(user).snapshotChanges().subscribe((profile)=>{
            this.profile = profile.payload.val()
          })
        }
      )
    }

    saveProfile(){
      if(this.authenticatedUser){
        this.loader.show();
        this.profile.email= this.authenticatedUser.email;
        this.data.saveProfile(this.authenticatedUser, this.profile)
        .then(response=>{
          this.loader.hide();
        })
      }
    }


}
