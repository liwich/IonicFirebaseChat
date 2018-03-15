import { Profile } from './../../models/profile/profile';
import { Message } from './../../models/messages/message';
import { ChatService } from './../../providers/chat/chat.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MESSAGE_LIST } from '../../mocks/messages';

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  messages: Message[];

  
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private chat:ChatService
  ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillLoad(){
    this.chat.getLastMessages()
    .subscribe((data)=>{
      this.messages= data;
      console.log(data);
    })
  }

  openChat(message: Message){
    var profile ={
      $key: message.userToId,
      firstName: message.userToProfile.firstName,
      lastName: message.userToProfile.lastName
    } as Profile;

    this.navCtrl.push("MessagePage",{profile: profile});
    
  }

}
