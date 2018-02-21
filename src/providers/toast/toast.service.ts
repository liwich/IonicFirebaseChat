import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
@Injectable()

export class ToastService{
    constructor(private toastCtrl:ToastController){

    }

    show(message:string, duration:number=3000){
        this.toastCtrl.create({
            message:message,
            duration:duration
        }).present();
    }
}