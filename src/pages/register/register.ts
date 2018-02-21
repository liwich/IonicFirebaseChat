import { AuthService } from './../../providers/auth/auth.service';
import { Account } from './../../models/account/account.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account= {} as Account;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

 register(){
      this.auth.registerWithEmailAndPassword(this.account.email, this.account.password)
      .then(response=>{
        this.navCtrl.setRoot("EditProfilePage");
      }).catch(error=>{
        console.error(error);
      })
  }

}
