import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  isLoggedIn: boolean = false;

  constructor(public app: App, public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(!localStorage.getItem("numApogee")) {
      navCtrl.setRoot(LoginPage);
    } else {
    	this.isLoggedIn = true;
    }
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
    
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);

    // this.authServiceProvider.logout().then((result) => {
    //   this.loading.dismiss();
    //   let nav = this.app.getRootNav();
    //   nav.setRoot(LoginPage);
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.presentToast(err);
    // });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public event = {
    
  }

}
