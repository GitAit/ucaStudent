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

@Injectable()
export class ResultServiceProvider {

	public data: any;

  constructor(public http: Http) {
    console.log('Hello ResultServiceProvider Provider');
  }

  load(resultsParams) {
	  // if (this.data) {
	  //   // already loaded data
	  //   return Promise.resolve(this.data);
	  // }


	  // don't have the data yet
	  return new Promise((resolve, reject) => {

      // var params = "numApogee=" + resultsParams.numApogee + "&annee=" + resultsParams.annee;
      // debugger;
      let headers = new Headers();
      // headers.append('Accept', 'application/json');
      // headers.append('Content-Type', 'application/json');

			let body = new FormData();
			body.append('numApogee', resultsParams.numApogee);
			body.append('annee', resultsParams.annee);


      this.http.post(apiUrl+'MesResultats.php', body, {headers: headers})
        .subscribe(data => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
	  });
	}

}

