import {Observable, Subscription} from 'rxjs/Rx'
import { AuthService } from './../auth/auth.service';
import { Message } from './../../models/messages/message';
import { ChannelMessage } from './../../models/channel/channel.message';
import { Channel } from './../../models/channel/channel';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin'

@Injectable()
export class ChatService {

  constructor( private db: AngularFireDatabase, private auth: AuthService) {
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

  sendMessage(message:Message){
    return this.db.list(`messages/`).push(message)
      .then(response=>{return response})
  }

  getMessages(userTwoId:String){
    return this.auth.getAuthenticatedUser()
    .map(user=>user.uid)
    .mergeMap(
      uid => 
        this.db.list(`user-messages/${uid}/${userTwoId}`)
        .snapshotChanges()
    )
    .mergeMap(
      chats=> chats.map(chat=> this.db.object(`messages/${chat.key}`).snapshotChanges())
    )
    .mergeMap(
      messages=> messages.map(z=>({key: z.key, ... z.payload.val()}))
    )
  }

}
