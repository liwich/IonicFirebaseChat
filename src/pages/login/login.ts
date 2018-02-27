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
  constructor(private data: DataService,public navCtrl: NavController, public navParams: NavParams, private auth:AuthService, private toast:ToastService) {
  }

  profileObject:Subscription;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLeave(){
    console.log("unsuscribe");
    this.profileObject.unsubscribe();
  }

 login(){  
    this.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
    .then(response=>{
      if(response.uid){
        this.profileObject= this.data.getProfile(response).snapshotChanges().subscribe(profile=>{
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
