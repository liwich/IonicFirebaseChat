import { ChannelMessage } from './../../models/channel/channel.message';
import { Channel } from './../../models/channel/channel';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {

  constructor( private db: AngularFireDatabase) {
  }

  addChannel(channelName: string){
    this.db.list("channel-names").push({name: channelName})
  }

  getChannels(): AngularFireList<Channel>{
   return this.db.list("channel-names");
  }
  
  getChannelChat(channelKey: string): AngularFireList<ChannelMessage>{
    return this.db.list(`channels/${channelKey}`);
  }

  sendChannelMessage(channelKey: string, message: ChannelMessage){
    this.db.list(`channels/${channelKey}`).push(message);
  }

}
