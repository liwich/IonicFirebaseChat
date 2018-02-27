import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {

  constructor(private loading: LoadingController) {
  }

  private loader:Loading;

  show(message:string=""){
    this.loader=this.loading.create({
      content: message
    });
    this.loader.present();
  }
  
  hide(){
    this.loader.dismiss();
  }

}
