import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root:string;
  tab2Root:string;
  tab3Root:string;

  constructor() {
    this.tab1Root = "InboxPage";
    this.tab2Root = "ChannelPage";
    this.tab3Root = "ProfilePage";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
