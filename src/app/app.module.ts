import { ToastService } from './../providers/toast/toast.service';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import {  AngularFireDatabaseModule} from "angularfire2/database";

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth/auth.service';
import { DataService } from '../providers/data/data.service';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../providers/loading/loading.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ToastService,
    DataService,
    LoadingService
  ]
})
export class AppModule {}
