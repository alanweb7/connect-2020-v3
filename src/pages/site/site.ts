import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-site',
  templateUrl: 'site.html',
})
export class SitePage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public browserTab: BrowserTab,
    private iab: InAppBrowser

  ) {

    browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          browserTab.openUrl('https://kscode.com.br/st2/connect/?code=oracao');
        } else {
          // open URL with InAppBrowser instead or SafariViewController
        }
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SitePage');
  }

  openpage() {




    // // window.open('https://www.google.com/', '_system', 'location=yes');
    // const browser = this.iab.create('https://kscode.com.br/st2/connect/?code=oracao');

    // // browser.executeScript();

    // // browser.insertCSS();

    // browser.on('loadstop').subscribe(event => {
    //   browser.insertCSS({ code: "body{color: red;" });
    // });

    // browser.close();
  }

}
