import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [NotificationProvider]
})

export class ListPage {
  public notifications: any;

  constructor(public notificationProvider: NotificationProvider){
    this.loadNotifications();
  }

  loadNotifications(){
    this.notificationProvider.load()
    .then(data => {

      this.notifications = data;

    });
  }


  changeDateFormat(dateString) {
    let dateArr = dateString.split(":", 3);
    dateArr.splice(2, 1);
    return dateArr.join(":");
  }

  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;

  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  //   // If we navigated to this page, we will have an item available as a nav param
  //   this.selectedItem = navParams.get('item');

  //   // Let's populate this page with some filler content for funzies
  //   this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  //   'american-football', 'boat', 'bluetooth', 'build'];

  //   this.items = [];
  //   for (let i = 1; i < 11; i++) {
  //     this.items.push({
  //       title: 'Item ' + i,
  //       note: 'This is item #' + i,
  //       icon: this.icons[Math.floor(Math.random() * this.icons.length)]
  //     });
  //   }
  // }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     item: item
  //   });
  // }
}
