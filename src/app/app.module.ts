import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotificationProvider } from '../providers/notification/notification';

import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ResultServiceProvider } from '../providers/result-service/result-service';

import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UniqueDeviceID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationProvider,
    AuthServiceProvider,
    ResultServiceProvider,
    FCM
  ]
})
export class AppModule {}
