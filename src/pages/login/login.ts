import { AuthService } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../providers/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account ={} as Account;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService, private toast:ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.auth.signInWithEmailAndPassword(this.account.email, this.account.password).then(response=>{
      console.log(response);
      this.navCtrl.setRoot("EditProfilePage"); 
    })
    .catch(error=> {
      this.toast.show("Incorrect email or password");
    })
  }
  
}
