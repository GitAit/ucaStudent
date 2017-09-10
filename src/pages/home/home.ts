import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { ResultServiceProvider } from '../../providers/result-service/result-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ResultServiceProvider]
})
export class HomePage {

  public results: any;

  loading: any;
  isLoggedIn: boolean = false;
  resultsData = { numApogee: localStorage.getItem("numApogee"), annee: localStorage.getItem("annee") };

  constructor(public app: App, public navCtrl: NavController, public resultServiceProvider: ResultServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(!localStorage.getItem("numApogee")) {
      navCtrl.setRoot(LoginPage);
    } else {
    	this.isLoggedIn = true;
      this.loadResults();
    }
  }


  loadResults(){
    this.resultServiceProvider.load(this.resultsData)
    .then(data => {
      this.results = data;
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

  resultSelected(result) {

  }

  public event = {
    
  }

}
