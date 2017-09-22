import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StudentServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

let apiUrl = 'http://ucastudent.uca.ma/';
// let apiUrl = 'http://localhost/uca_notes/';
// let apiUrl = 'http://2cc3a28e.ngrok.io/uca_notes/';
// let apiUrl = 'http://abouelassad.cf/uca_notes/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        var creds = "cne=" + credentials.cne + "&apogee=" + credentials.apogee+"&dateNaissance=" + credentials.dateNaissance + "&token=" + credentials.token;
        // debugger;
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');


        this.http.post(apiUrl+'Login.php', creds, {headers: headers})
          .subscribe(data => {
            resolve(data.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

}
