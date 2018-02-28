import { LoadingService } from './../../providers/loading/loading.service';
import { DataService } from './../../providers/data/data.service';
import { AuthService } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../providers/toast/toast.service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account ={} as Account;
  constructor(
    private data: DataService,
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private auth:AuthService, 
    private toast:ToastService,
    private loader: LoadingService) {
  }

  profileObject:Subscription;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLeave(){
    if(this.profileObject){
      this.profileObject.unsubscribe();    
    }
  }

 login(){  
   this.loader.show();
    this.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
    .then(response=>{

      this.loader.hide();      
      if(response.uid){
        this.profileObject= this.data.getProfile(response).snapshotChanges().subscribe(
          profile=>{
          console.log(profile);
          if(profile.key){
            this.navCtrl.setRoot("TabsPage");
          }else{
            this.navCtrl.setRoot("EditProfilePage")
          }
        })
      }else{
        this.toast.show("Incorrect credentials");  
      }
    })
  }

  
}
