import { DataService } from './../../providers/data/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  profiles: Profile[]=[];
  query:string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private data:DataService) {
  }

  searchUser(){
    var queryTrimmed= this.query.trim();
    if(queryTrimmed===this.query){
      this.data.searchUsers(this.query).subscribe(profiles=>{
        this.profiles= profiles;
      }) 
    }
  }

}
