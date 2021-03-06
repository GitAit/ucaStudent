import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
export class NotificationProvider {

	public data: any;

  constructor(public http: Http) {
    console.log('Hello NotificationProvider Provider');
  }

  load() {
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.get(apiUrl+'Notifications.php?filiere='+localStorage.getItem("filiere"))
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data, now generate the core schedule data
	        // and save the data for later reference
	        this.data = data;
	        resolve(this.data);
	      });
	  });
	}

}
