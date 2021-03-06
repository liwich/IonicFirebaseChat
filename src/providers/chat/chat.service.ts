import {Observable, Subscription} from 'rxjs/Rx'
import { AuthService } from './../auth/auth.service';
import { Message } from './../../models/messages/message';
import { ChannelMessage } from './../../models/channel/channel.message';
import { Channel } from './../../models/channel/channel';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin'
import 'rxjs/operators/zip'
import 'rxjs/operators/mergeMap'



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

  getMessages(userTwoId:string): Observable<Message[]>{
    return this.auth.getAuthenticatedUser()
    .map(user=>user.uid)
    .mergeMap(
      uid => 
        this.db.list(`user-messages/${uid}/${userTwoId}`)
        .snapshotChanges()
    )
    .mergeMap(
      chats=> {
        return Observable.forkJoin(
          chats.map(chat=> this.db.object(`messages/${chat.key}`).snapshotChanges())
          .map(messages=> messages.map(z=>({key: z.key, ... z.payload.val()})).first()),
          
          (...vals: Message[]) => {
            return vals;
          }
        )
      })
  }

  getLastMessages(){
    return this.auth.getAuthenticatedUser()
    .map(user=>user.uid)
    .mergeMap(
      uid=>
        this.db.list(`last-messages/${uid}`).snapshotChanges()
    )
    .mergeMap(
      messagesIds=>{

        return Observable.forkJoin(
          
          messagesIds.map(z=> ({key: z.key, ... z.payload.val()}))
          .map(
            chats=> this.db.object(`messages/${chats.key}`).snapshotChanges())
          .map( messages=> messages.map(z=>({key: z.key, ... z.payload.val()})).first())

          ,
          (...vals: Message[]) => {
            return vals;
          }
          
        )
      }
    )
  }

}
