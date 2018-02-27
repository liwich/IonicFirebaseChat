import { Profile } from './../../models/profile/profile';
import { User } from 'firebase/app';
import { AuthService } from './../../providers/auth/auth.service';
import { DataService } from './../../providers/data/data.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private data:DataService,
    private auth:AuthService) {

      this.authenticatedUser$ = auth.getAuthenticatedUser().subscribe(user=>{
        this.authenticatedUser= user;
      })
    }
    
    ngOnInit(): void {
      this.auth.getAuthenticatedUser().subscribe(
        (user:User)=>{
          this.data.getProfile(user).snapshotChanges().subscribe((profile)=>{
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


}
