import { LoadingService } from './../../providers/loading/loading.service';
import { Observable } from 'rxjs/Observable';
import { Channel } from './../../models/channel/channel';
import { ChatService } from './../../providers/chat/chat.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  channelsList:Channel[];
  channelsList$: Subscription;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private alert: AlertController,
    private chat: ChatService,
    private loader: LoadingService
  ) {}

  ionViewDidEnter(){
    this.getChannels();
  }

  ionViewWillLeave(){
    if(this.channelsList$){
      this.channelsList$.unsubscribe();
    }
  }

  showAddChannelDialog(){
    this.alert.create({
       title:"Channel Name",
      inputs:[{name: 'channelName'}],
      buttons:[
        {text:"Cancel", role:'cancel'},
        { text:"Save", 
        handler:data =>{
        this.chat.addChannel(data.channelName)
        }}
      ]
    }).present();
  }

  getChannels(){
    this.loader.show();
    this.channelsList$ =  this.chat.getChannels().snapshotChanges().map(changes => {
     this.channelsList = changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
     this.loader.hide();
    }).subscribe();
  }

}
