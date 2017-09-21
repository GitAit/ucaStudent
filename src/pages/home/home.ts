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
  resultsData = { numApogee: localStorage.getItem("numApogee"), annee: localStorage.getItem("annee"), codeELP:"" };

  constructor(public app: App, public navCtrl: NavController, public resultServiceProvider: ResultServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    if(!localStorage.getItem("numApogee")) {
      navCtrl.setRoot(LoginPage);
    } else {
      // this.showLoader();
      // this.loadResults();
      this.isLoggedIn = true;
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading Results...'
    });

    this.loading.present();
  }

  loadResults(){
    this.resultServiceProvider.load(this.resultsData)
    .then(data => {
      // debugger;


      this.results = data;
      this.presentToast(JSON.stringify(data));
      // this.hideModDetails();

    });
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Results...',
    });

    loader.present().then(() => {
      this.resultServiceProvider.load(this.resultsData)
      .then(data => {
        // debugger;

        this.results = data;
        // this.presentToast(JSON.stringify(data));
        // this.hideModDetails();

      });
      loader.dismiss();
    });
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

  resultSelected(result, index) {
    if (result.natureELP == 'MOD') { 
      if (result.showDetails == true) { 
        result.showDetails = false;
      } else {
        this.hideModDetails();
        result.showDetails = true;
      }
    }    
  }

  hideModDetails() {
    for(let result of this.results) {
      result.showDetails = false;
    }    
  }

  public event = {
    
  }

}
