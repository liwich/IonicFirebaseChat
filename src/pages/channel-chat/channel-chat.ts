import { Subscription } from 'rxjs/Subscription';
import { ChannelMessage } from './../../models/channel/channel.message';
import { ChatService } from './../../providers/chat/chat.service';
import { Channel } from './../../models/channel/channel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {
  channel= {} as Channel;
  messagesList$: Subscription;
  messagesList=[] as ChannelMessage[];
  channelMessage= {} as ChannelMessage;


  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private chat: ChatService
  ) {}

  ionViewDidLoad() {
    this.channel = this.navParams.get('channel');
  }

  ionViewDidEnter(){
    this.getChannelChat();
  }
  
  ionViewWillLeave(){
    if(this.messagesList$){
      this.messagesList$.unsubscribe();
    }
  }

  getChannelChat(){
    
    this.messagesList$= this.chat.getChannelChat(this.channel.$key).valueChanges().subscribe(
      data=>{
        this.messagesList = data;
      }
    );
  }

  sendMessage(){
    this.chat.sendChannelMessage(this.channel.$key,this.channelMessage);
    this.channelMessage.content="";
  }

}
