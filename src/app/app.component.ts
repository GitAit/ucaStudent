import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
// import { Auth } from '@ionic/cloud-angular';

import { Events, ToastController } from 'ionic-angular';

declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  // rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;
  name: string;
  etab: string;
  filiere: string;
  annee: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Résultats', icon: 'results', component: HomePage },
      { title: 'Notifications', icon: 'notification', component: ListPage }
    ];

    this.name = localStorage.getItem("nom")+' '+localStorage.getItem("prenom");
    this.etab = localStorage.getItem("etab");
    this.filiere = localStorage.getItem("filiere");
    this.annee = localStorage.getItem("annee")+'/'+(parseInt(localStorage.getItem("annee"))+1);

    events.subscribe('data:changed', data => {
      this.name = data.nom+' '+data.prenom;
      this.etab = data.etab;
      this.filiere = data.filiere;
      this.annee = data.annee+'/'+(parseInt(data.annee)+1);
    })

    // this.name = localStorage.getItem("nom")+' '+localStorage.getItem("prenom");
    // this.etab = localStorage.getItem("etab");
    // this.filiere = localStorage.getItem("filiere");
    // this.annee = localStorage.getItem("annee")+'/'+(parseInt(localStorage.getItem("annee"))+1);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (typeof FCMPlugin != 'undefined') {
        FCMPlugin.onNotification(
          (data) => {
            console.log(data);
            // this.showToast(data);
          },
          (e) => {
            console.log(e);
            // this.showToast(e);
          }
        );
      }



      // if(this.auth.isAuthenticated()) {
      //   this.rootPage = HomePage;
      // } else {
      //   this.rootPage = LoginPage;
      // }
    });
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.removeItem('numApogee');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('cne');
    localStorage.removeItem('dateNaissance');
    localStorage.removeItem('annee');
    localStorage.removeItem('etab');
    localStorage.removeItem('filiere');
    
    this.nav.setRoot(LoginPage);

    // this.authServiceProvider.logout().then((result) => {
    //   this.loading.dismiss();
    //   let nav = this.app.getRootNav();
    //   nav.setRoot(LoginPage);
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.presentToast(err);
    // });
  }
}
