import { Component } from '@angular/core';
import { NavController, LoadingController, Events, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

declare var FCMPlugin;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { cne:'1210125458', apogee:'1577135', dateNaissance:'', token:'fJRamd9hQmE:fJRamd9hQmE:APA91bELh6bL4mAkktPoO8mrpV31XsXSOKjw257788888' };
  // loginData = { cne:'1210125458', apogee:'1577135', dateNaissance:'15/12/1993', token:'fJRamd9hQmE:fJRamd9hQmE:APA91bELh6bL4mAkktPoO8mrpV31XsXSOKjw257788888' };
  data: any;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private uniqueDeviceID: UniqueDeviceID, public events: Events) {}

  doLogin() {
    this.showLoader();
    var that = this;
    
    if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.getToken(
        (t) => {
          this.loginData.token = t;
          this.executeLogin();
          console.log(t);
          // this.showToast(t);
        },
        (e) => {
          console.log('error retrieving token: ' + e);
          // this.showToast('error retrieving token: ' + e);
        }
      );
    } else {
      this.executeLogin();
    }

    // this.getDeviceToken();
  }

  executeLogin(){
    var dateNaissance = new Date(this.loginData.dateNaissance);
    this.loginData.dateNaissance = dateNaissance.getDate().toString()+'/'+(dateNaissance.getMonth()+1).toString()+'/'+dateNaissance.getFullYear().toString();

    this.authServiceProvider.login(this.loginData).then((result) => {
      this.loading.dismiss();
    
      this.data = result;

      this.events.publish('data:changed', this.data);

      localStorage.setItem('numApogee', this.data.numApogee);
      localStorage.setItem('nom', this.data.nom);
      localStorage.setItem('prenom', this.data.prenom);
      localStorage.setItem('cne', this.data.cne);
      localStorage.setItem('dateNaissance', this.data.dateNaissance);
      localStorage.setItem('annee', this.data.annee);
      localStorage.setItem('etab', this.data.etab);
      localStorage.setItem('filiere', this.data.filiere);

      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
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

  getDeviceToken(){
    if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.getToken(
        (t) => {
          this.loginData.token = t;
          console.log(t);
          this.showToast(t);
        },
        (e) => {
          console.log('error retrieving token: ' + e);
          // this.showToast('error retrieving token: ' + e);
        }
      );
    }
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }


  public event = {
    month: '1990-02-19',
  }

}
