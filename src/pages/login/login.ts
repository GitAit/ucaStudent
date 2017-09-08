import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { cne:'1210125458', apogee:'1577135', dateNaissance:'', token:'fJRamd9hQmE:fJRamd9hQmE:APA91bELh6bL4mAkktPoO8mrpV31XsXSOKjw257788888' };
  // loginData = { cne:'1210125458', apogee:'1577135', dateNaissance:'15/12/1993', token:'fJRamd9hQmE:fJRamd9hQmE:APA91bELh6bL4mAkktPoO8mrpV31XsXSOKjw257788888' };
  data: any;

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private uniqueDeviceID: UniqueDeviceID) {}

  doLogin() {
    this.showLoader();
    this.uniqueDeviceID.get()
	  .then((uuid: any) => console.log(uuid))
	  .catch((error: any) => console.log(error));

    var dateNaissance = new Date(this.loginData.dateNaissance);
    this.loginData.dateNaissance = dateNaissance.getDate().toString()+'/'+(dateNaissance.getMonth()+1).toString()+'/'+dateNaissance.getFullYear().toString();

    this.authServiceProvider.login(this.loginData).then((result) => {
      this.loading.dismiss();
    
      this.data = result;

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

  public event = {
    month: '1990-02-19',
  }

}
