import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Events } from 'ionic-angular';

import { CodeProvider } from './../../providers/code/code';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
/**
 * Generated class for the CodePesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code-pesquisa',
  templateUrl: 'code-pesquisa.html',
})
export class CodePesquisaPage {
  codes: any;
  results: Object;
  campo;
  isLoading: String;
  //searchTerm       : string = '';
  searchTerm$ = new Subject<string>();
  ////teste
  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;
  token;
  language: any;
  page: any;
  texto: any;
  endLat: any;
  endLong: any;
  termoPesquisa;
  constructor(
    private geoProv: GeolocationProvider,
    public navCtrl: NavController,
    public toast: ToastController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private codeProvider: CodeProvider,
    private events: Events
  ) {
    this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    this.termoPesquisa = this.navParams.get('termoPesquisa');

    if (this.termoPesquisa && this.termoPesquisa !== '') {
      this.searchTerm = this.termoPesquisa;
      this.setFilteredItems();
    }

    this.isLoading = "";
    this.language = this.navParams.get('lang');
    this.token = this.navParams.get('token');
    this.campo = this.navParams.get('campo');
    this.page = this.navParams.get('page_pesquisa');
    this.texto = this.navParams.get('texto');
    this.pushGeoinfo();
    this.searchControl.valueChanges.debounceTime(300).subscribe(search => {
      console.log(search);
      this.searching = false;
      this.setFilteredItems();

    });
  }
  onSearchInput() {
    this.searching = true;
  }
  setFilteredItems() {

    this.codes = [];
    this.isLoading = "true";
    this.searching = true;
    if (!this.searchTerm) {
      this.codes = [];
      this.isLoading = "";
      this.searching = false;
      this.onCancel();
    } else {

      this.codeProvider.searchEntries(this.searchTerm)
        .then((results: any) => {
          console.log('results recebidos no code-pesquisa: ', results);
          this.searching = false;
          this.codes = results;
          if (this.codes <= 0) {
            this.toast.create({ message: this.texto, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'alerta' }).present();

          }
          this.isLoading = "";
        });

      // this.codeProvider.searchEntries(this.searchTerm)
      //   .subscribe((results: any) => {
      //     this.searching = false;
      //     this.codes = results;
      //     if (this.codes <= 0) {
      //       this.toast.create({ message: this.texto, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'alerta' }).present();

      //     }
      //     this.isLoading = "";
      //   });


    }
  }

  onCancel() {

    this.isLoading = "";
    this.searching = false;
    return this.codes = [];

  }
  pushPage(code) {

    let sendData = {
      liberado: false,
      origem: 4,
      token: this.token,
      lang: this.language,
      code: code,
      latitude: this.endLat,
      longitude: this.endLong,
      telephone: "",
      pageOrigem: 'CodePesquisaPage',
      termoPesquisa: this.searchTerm
    };

    this.navCtrl.push('RedirectPage', { data: sendData });
    // this.navCtrl.push('DetalheCodePage', {});
  }

  pushGeoinfo() {

    this.geoProv.getGeolocation().then((resp: String[]) => {

      this.endLat = resp["latitude"];
      this.endLong = resp["longitude"];

    });

  }

  // saindo da pagina
  ionViewWillLeave() {
    console.log('Saindo da página code-pesquisa: ');
    let dataUser = { 
      pageOrigem: 'CodePesquisaPage',
      termoPesquisa: this.searchTerm
    };
    this.events.publish('pageOrigem', dataUser);
    this.events.publish('searchTerm', this.searchTerm);
  }


}
