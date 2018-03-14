import { DataService } from './../../providers/data/data.service';
import { ChatService } from './../../providers/chat/chat.service';
import { Message } from './../../models/messages/message';
import { AuthService } from './../../providers/auth/auth.service';
import { Profile } from './../../models/profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx'

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  profile= {} as Profile;
  userId:string;
  authenticatedProfile$:Subscription;
  authenticatedProfile:Profile;
  message= {} as Message;
  messages:Message[];
  

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private auth:AuthService,
    private chat:ChatService,
    private data: DataService
  ) 
  {  }

  ionViewDidLoad() {
  }

  ionViewWillLoad(){
    this.profile = this.navParams.get('profile');

    this.authenticatedProfile$ = this.data.getAuthenticatedProfile().subscribe( authProfile=>{
      this.authenticatedProfile = authProfile;
      this.fillMessageUsers();

       this.chat.getMessages(this.profile.$key).subscribe((data:Message[])=>{
        this.messages = data; 
       })

    });
  }

  fillMessageUsers(){
    this.message.userToId = this.profile.$key;
        this.message.userToProfile = {
        firstName: this.profile.firstName,
        lastName:this.profile.lastName
      };

      this.message.userFromId = this.authenticatedProfile.$key;
      this.message.userFromProfile = {
        firstName: this.authenticatedProfile.firstName,
        lastName: this.authenticatedProfile.lastName
      };
  }

  ionWillLeave(){
    this.authenticatedProfile$.unsubscribe();
  }

  sendMessage(){
    this.chat.sendMessage(this.message).then(response=>{
      this.message.content = "";
    })
  }

}
