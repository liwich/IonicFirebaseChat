import { ToastService } from './../../providers/toast/toast.service';
import { LoadingService } from './../../providers/loading/loading.service';
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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private auth:AuthService,
    private toast:ToastService,
    private loader: LoadingService) {
  }

  ionViewDidLoad() {
  }

 register(){
      this.loader.show();
      this.auth.registerWithEmailAndPassword(this.account.email, this.account.password)
      .then(response=>{
        this.loader.hide();
        this.navCtrl.setRoot("EditProfilePage");
      }).catch(error=>{
        this.loader.hide();
        this.toast.show("There was an error registering your account, please try again");
      })
  }

}
