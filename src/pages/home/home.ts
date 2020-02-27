import { AdminToolsRest, AdminToolsDb } from './../../providers/admin-tools/admin-tools';
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../../providers/network/network';
import { Component, Input, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform, Loading, LoadingController, Events, AlertController, ModalController, ToastController, ViewController } from 'ionic-angular';
//Import Native
import { OneSignal } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
//import Provider
import { CodeProvider } from '../../providers/code/code';
import { UsuarioService } from '../../providers/movie/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Keyboard } from '@ionic-native/keyboard';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { SqliteHelperService } from '../../providers/sqlite-helper/sqlite-helper.service';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilService } from '../../providers/util/util.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
// Pacote IOS: br.com.kscode.app360
// Pacote Google: com.kcode360.kcode
@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  @ViewChild('input') myInput;
  public modalIsOpen: boolean;
  public signupform: FormGroup;
  codeNumber: any;
  endLat: any;
  endLong: any;
  myfone: any;
  movies: Usuario[] = [];
  token: any;
  id: any;
  id_serv: Number;
  footerIsHidden: Boolean = true;
  public myGlobalVar: string;
  public title: string;
  public description: string;
  public language: string = "pt";
  button: String = "";
  pesquisa: String = "";
  adquira: String = "";
  data = {
    id_serv: Number,
    name: String,
    sobrenome: String,
    email: String,
    photo: String,
    logado: String,
    token: String,
    usuario: String,
    lang: String,
    cnpj: String,
    tp_pessoa: String

  }
  trans = {
    login: String,
    home: String,
    favoritos: String,
    pesquisa: String,
    codes: String,
    sair: String,
    page_pesquisa: String,
    msg_servidor: String,
    load_aguarde: String,
    nome: String,
    sobrenome: String,
    email: String,
    empresa: String,
    segmento: String,
    cep: String,
    cidade: String,
    estado: String,
    page: String,
    btn_salvar: String,
    page_login: String,
    load_enviando: String,
    campo_obrigatorio: String,
    frase: String,
    senha: String,
    esqueceu: String,
    ou: String,
    conta: String,
    page_senha: String,
    texto_1: String,
    texto_2: String,
    usuario: String,
    page_conta: String
  }
  campo;
  load_aguarde: any;
  msg_erro: any;
  selecione: any;
  btn_cancelar: any;
  btn_continuar: any;
  code_existe: any;
  btn_ircode: any;
  btn_fechar: any;
  page_pesquisa: any;
  page_consulta: any;
  msg_servidor: any;
  isPT: boolean = true;
  isDE: boolean = false;
  isEN: boolean = false;
  isES: boolean = false;
  isFR: boolean = false;
  isIT: boolean = false;
  page_login: any;
  load_enviando: any;
  campo_obrigatorio: any;
  frase: any;
  page: any;
  senha: any;
  esqueceu: any;
  ou: any;
  conta: any;
  page_senha: any;
  texto_1: any;
  texto_2: any;
  email;
  texto: any;
  msg_code: any;
  statusConn: any;
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,

    public navParams: NavParams,
    private global: CodeProvider,
    private geoProv: GeolocationProvider,
    private platform: Platform,
    private events: Events,
    private socialSharing: SocialSharing,
    private browserTab: BrowserTab,
    private oneSignal: OneSignal,

    public net: NetworkProvider,
    public network: Network,
    private usuario: UsuarioService,
    private cli_Provider: ClienteProvider,
    private keyboard: Keyboard,
    public modalCtrl: ModalController,
    public sqliteHelperService: SqliteHelperService,
    private translate: TranslateService,
    public formBuilder: FormBuilder,
    public util: UtilService,
    public toast: ToastController,
    public networkProvider: NetworkProvider,
    private locationAccuracy: LocationAccuracy,
    public ApiRest: AdminToolsRest,
    public adminDb: AdminToolsDb,
    public viewCtrl: ViewController,

  ) {
    // teste

    //   this.navCtrl.push('ClientDetailPage', params) // push in new page, increments view index
    //   .then(() => {
    //     /*Set the index back 2 pages but remove 3 because we don't want 
    //     ClientDetailPage on the stack twice (because we have added it above).*/
    //     this.navCtrl.remove(this.viewCtrl.index - 2, 3); 
    // });

    // let currentIndex = this.navController.getActive().index;
    // this.navController.push(DestinationPage).then(() => {
    //     this.navController.remove(currentIndex);
    // });

    // console.log('Dados da Navegação: ',this.viewCtrl);

    // this.navCtrl.remove(this.viewCtrl.index - 2, 3);

    let texto = '"casa"';
    if (texto[texto.length - 1] == '"' && texto[0] == '"') {
      texto = texto.substring(1, texto.length - 1);
    }
    console.log(texto);

    // configurações iniciais :: criação do banco de dados
    // this.setConfigInitial();
    this.viewCtrl = viewCtrl;
    this.getDeviceInfo();

    this.modalIsOpen = this.navParams.get('modalIsOpen');
    if (this.modalIsOpen == true) {
      this.util.loading.dismissAll();
    }

    let error = this.navParams.get('error');
    console.log('erro recebido na HOME:: ', error);
    if (error && error.status == -3) {

      this.netFail();

    }

    this.signupform = new FormGroup({

      codeNumber: new FormControl('', []),

    });

    if (this.platform.is('ios')) {
      this.sqliteHelperService.getDb()
        .then((movies: any) => {
          //alert("alert deu certo");
        }).catch((erro) => {
          // alert("deu errado"+erro);
        });
    }

  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('enter ionViewDidLoad homePage:');

    let pageNav = { pageOrigem: 'HomePage' };
    this.events.publish('pageOrigem', pageNav);
    console.log('Página de origem definida na HomePage');
    
    let dataUser: any = this.data;
    dataUser.token = '';

    this.events.publish('dados', dataUser);

    setTimeout(() => {
      console.log('iniciando o foco');
      this.language = "pt";
      this.isPT = true;
    }, 150);

    //CHAMDA DO BANCO DE DADOS
    this.platform.ready().then(() => {
      this.usuario.getAll()
        .then((movies: any) => {
          console.log('Dados do banco interno: ', movies);
          if (movies.length == 1) {
            console.log('Dados Iniciais: ', movies);
            this.data.name = movies[0].name;
            this.data.sobrenome = movies[0].sobrenome;
            this.data.email = movies[0].email;
            this.data.token = movies[0].token;
            this.token = movies[0].token;
            this.data.logado = movies[0].logado;
            this.data.id_serv = movies[0].id_serv;
            this.data.photo = movies[0].photo;
            this.data.usuario = movies[0].usuario;
            this.data.lang = movies[0].cpf;
            this.language = movies[0].lang;
            this.id_serv = movies[0].id_serv;
            this.data.cnpj = movies[0].cnpj;
            this.data.tp_pessoa = movies[0].tp_pessoa;

            // this.update_cupom();
            this.trogle_idiome_onesignal();
            //  this.events.publish('trans',this.language);
            this.events.publish('dados', this.data);
          } else {
            this.language = "pt";
            console.log("minha lang", this.language);
            console.log("entrei no else");
            this.isPT = true;
            this.trogle_idiome_onesignal();
          }
          // this.language= "pt";
          // this.isPT  =  true;
          this.pushGeoinfo();
          this.trogle_idiome(this.language);
          this._translateLanguage();
          this.oneSignalApp();

        }).catch((error) => {
          alert("sqlite Erro " + error);
          this.language = "pt";
          this.isPT = true;
          this.pushGeoinfo();
          this.trogle_idiome(this.language);
          this._translateLanguage();
          this.oneSignalApp();
        });
      this.language = "pt";
      this.isPT = true;
    });///final platform ready


    this.keyboard.onKeyboardShow().subscribe(() => {
      this.footerIsHidden = false;
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.footerIsHidden = true;
    });

  }


  // saindo da pagina
  ionViewWillLeave() {
  }

  setConfigInitial() {
    console.log('iniciando a ciração do banco');
    let res = this.adminDb.createDatabase();

    this.adminDb.getAll().then((resp) => {
      console.log('Resultado do banco Push: ', resp);
      let userConnect: any = resp;
      if (!userConnect || userConnect.length == 0) {
        console.log('Direcionando para a página de checkin');
        this.navCtrl.push('CheckinPage');
      }
    });

  }


  trogle_idiome(id) {
    console.log("lang", id);
    if (id == 'pt') {
      this.isDE = false;
      this.isPT = true;
      this.isES = false;
      this.isFR = false;
      this.isEN = false;
      this.isIT = false;
    } else if (id == 'de') {
      this.isDE = true;
      this.isPT = false;
      this.isES = false;
      this.isFR = false;
      this.isEN = false;
      this.isIT = false;
    } else if (id == 'en') {
      this.isDE = false;
      this.isPT = false;
      this.isES = false;
      this.isFR = false;
      this.isEN = true;
      this.isIT = false;
    } else if (id == 'it') {
      this.isDE = false;
      this.isPT = false;
      this.isES = false;
      this.isFR = false;
      this.isEN = false;
      this.isIT = true;
    } else if (id == 'fr') {
      this.isDE = false;
      this.isPT = false;
      this.isES = false;
      this.isFR = true;
      this.isEN = false;
      this.isIT = false;
    } else if (id == 'es') {
      this.isDE = false;
      this.isPT = false;
      this.isES = true;
      this.isFR = false;
      this.isEN = false;
      this.isIT = false;
    } else {
      this.isDE = false;
      this.isPT = true;
      this.isES = false;
      this.isFR = false;
      this.isEN = false;
      this.isIT = false;
    }
  }

  pushPage(action = null) {

    if (action === 'qrcode') {
      this.navCtrl.push('QrcodePage', { id: 812 });
      return;
    }

    if (!this.codeNumber) {
      alert('Digite algo pra acessar');
    } else {

      let latitude = this.endLat;
      let longitude = this.endLong;
      console.log('home codes com gps');
      let sendData = {
        liberado: false, origem: 1, token: this.token, lang: this.language,
        code: this.codeNumber,
        latitude: latitude, longitude: longitude,
        telephone: this.global.myGlobalVar
      };

      this.navCtrl.push('RedirectPage', { data: sendData });
    }
  }

  pushGeoinfo() {

    this.platform.ready().then(() => {

      this.geoProv.getGeolocation().then((resp: String[]) => {
        console.log('home total geolocation:', resp);
        this.endLat = resp["latitude"];
        this.endLong = resp["longitude"];
        console.log('home geolocation: ', this.endLat, this.endLong);
      });
    });
  }

  // vierificar o localizador
  verifyGeolocationIsActive() {
    this.platform.ready().then(() => {
      // verifique a geolocalizacao
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => console.log('Request successful'),
            error => console.log('Error requesting location permissions', error)
          );
        }
      });
    });
  }


  pushPageCode(code) {

    let sendData = {
      liberado: false, origem: 1, token: this.token, lang: this.language, code: code,
      latitude: this.endLat, longitude: this.endLong,
      telephone: this.global.myGlobalVar
    };

    this.navCtrl.push('RedirectPage', { data: sendData });

  }

  pushPagePesquisa() {

    // let sendData = {texto:this.texto,campo:this.campo,page_pesquisa:this.page_consulta,msg_servidor:this.msg_servidor,load_aguarde:this.load_aguarde,token:this.token,lang:this.language};
    // this.navCtrl.push('RedirectPage', {data:sendData});
    this.navCtrl.setRoot('CodePesquisaPage', { texto: this.texto, campo: this.campo, page_pesquisa: this.page_consulta, msg_servidor: this.msg_servidor, load_aguarde: this.load_aguarde, token: this.token, lang: this.language });

    // let myModal =this.modalCtrl.create('CodePesquisaPage',{texto:this.texto,campo:this.campo,page_pesquisa:this.page_consulta,msg_servidor:this.msg_servidor,load_aguarde:this.load_aguarde,token:this.token,lang:this.language});
    // myModal.present();
  }
  showCheckbox() {

    let alert = this.alertCtrl.create();



    alert.setTitle(this.selecione);
    //ingles, espanhol, italiano, frances e alemão
    alert.addInput({
      type: 'radio',
      label: "Português",
      value: "pt",
      checked: this.isPT
    });
    alert.addInput({
      type: 'radio',
      label: "Inglês",
      value: "en",
      checked: this.isEN
    });
    alert.addInput({
      type: 'radio',
      label: "Espanhol",
      value: "es",
      checked: this.isES
    });
    alert.addInput({
      type: 'radio',
      label: "Italiano",
      value: "it",
      checked: this.isIT
    });
    alert.addInput({
      type: 'radio',
      label: "Frânces",
      value: "fr",
      checked: this.isFR
    });
    alert.addInput({
      type: 'radio',
      label: "Alemão",
      value: "de",
      checked: this.isDE
    });
    alert.addButton(this.btn_cancelar);
    alert.addButton({
      text: this.btn_continuar,
      handler: data => {
        console.log('radio data:', data);
        this.language = data;
        this.usuario.update_lang(this.language, this.id_serv)
          .then((data: any) => {
            console.log(data);

          });
        this.trogle_idiome(this.language);
        this.changeLanguage();


      }
    });
    alert.present();
  }
  // compartilhar social share
  shareSheetShare() {
    this.socialSharing.share("KSCODE - Tudo se conecta aqui! ->", "Share subject", "", "https://play.google.com/store/apps/details?id=com.kcode360.kcode").then(() => {

    }).catch(() => { });
  }

  shopcode() {
    var url = 'https://kscode.com.br/pacotes/';
    this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        }
      });
  }
  // push notification onesignal
  oneSignalApp() {
    console.log(this.btn_fechar, this.btn_ircode);
    this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(notification => {
      console.log(notification);
      //var notificationData       = notification.notification.payload;
      /*  var notificationAdditional = notificationData.additionalData;
       var notificationCode       = notificationAdditional.code; */
      // this.redirectPush(notification);
      const confirm = this.alertCtrl.create({
        title: notification.payload.title,
        message: notification.payload.body,
        buttons: [
          {
            text: this.btn_fechar,
            handler: () => {

            }
          },
          {
            text: this.btn_ircode,
            handler: () => {
              this.redirectPush(notification.payload.additionalData.code);
            }
          }
        ]
      });
      confirm.present();
    });
    this.oneSignal.handleNotificationOpened().subscribe(notification => {
      var notificationData = notification.notification.payload;
      var notificationAdditional = notificationData.additionalData;
      var notificationCode = notificationAdditional.code;
      this.redirectPush(notificationCode);
    });

    this.oneSignal.endInit();
  }
  public changeLanguage(): void {
    this._translateLanguage();
  }


  private _translateLanguage(): void {
    this.translate.use(this.language);
    this.trogle_idiome(this.language);
    console.log("linguagem", this.language);
    this._initialiseTranslation();
  }

  private _initialiseTranslation(): void {
    setTimeout(() => {
      this.title = this.translate.instant("home.heading");
      this.button = this.translate.instant("home.button");
      this.pesquisa = this.translate.instant("home.pesquisa");
      this.adquira = this.translate.instant("home.adquira");
      this.trans.login = this.translate.instant("menu.login");
      this.trans.home = this.translate.instant("menu.home");
      this.trans.favoritos = this.translate.instant("menu.favoritos");
      this.trans.pesquisa = this.translate.instant("menu.pesquisa");
      this.trans.codes = this.translate.instant("menu.codes");
      this.trans.sair = this.translate.instant("menu.sair");
      this.trans.page_pesquisa = this.translate.instant("default.page_pesquisa");
      this.trans.load_aguarde = this.translate.instant("default.load_aguarde");
      this.trans.msg_servidor = this.translate.instant("default.msg_servidor");
      this.trans.btn_salvar = this.translate.instant("default.btn_salvar");
      this.trans.nome = this.translate.instant("minha_conta.nome");
      this.trans.sobrenome = this.translate.instant("minha_conta.sobrenome");
      this.trans.email = this.translate.instant("minha_conta.email");
      this.trans.empresa = this.translate.instant("minha_conta.empresa");
      this.trans.segmento = this.translate.instant("minha_conta.segmento");
      this.trans.cep = this.translate.instant("minha_conta.cep");
      this.trans.cidade = this.translate.instant("minha_conta.cidade");
      this.trans.estado = this.translate.instant("minha_conta.estado");
      this.trans.page_conta = this.translate.instant("minha_conta.page");

      this.load_aguarde = this.translate.instant("default.load_aguarde");
      this.msg_erro = this.translate.instant("default.msg_erro");
      this.selecione = this.translate.instant("videos.selecione");
      this.btn_cancelar = this.translate.instant("default.btn_cancelar");
      this.btn_continuar = this.translate.instant("default.btn_continuar");
      this.code_existe = this.translate.instant("home.code_existe");
      this.btn_ircode = this.translate.instant("default.btn_ircode");
      this.btn_fechar = this.translate.instant("default.btn_fechar");

      console.log(this.btn_cancelar, this.btn_continuar, this.btn_fechar, this.btn_ircode);
      this.page_pesquisa = this.translate.instant("default.page_pesquisa");
      // this.load_aguarde           = this.translate.instant("default.btn_fechar");
      this.msg_servidor = this.translate.instant("default.msg_servidor");
      this.page_consulta = this.translate.instant("default.page_pesquisa");
      this.campo = this.translate.instant("meus_codes.campo");
      this.texto = this.translate.instant("default.pesquisa");

      this.trans.page_login = this.translate.instant("login.page");
      this.trans.load_enviando = this.translate.instant("default.load_enviando");
      this.trans.campo_obrigatorio = this.translate.instant("default.campo_obrigatorio");
      this.trans.frase = this.translate.instant("login.frase");
      this.trans.page = this.translate.instant("login.page");
      this.trans.usuario = this.translate.instant("login.usuario");
      this.trans.senha = this.translate.instant("login.senha");
      this.trans.esqueceu = this.translate.instant("login.esqueceu");
      this.trans.ou = this.translate.instant("login.ou");
      this.trans.conta = this.translate.instant("login.conta");
      this.trans.page_senha = this.translate.instant("recupera_senha.page");
      this.trans.texto_1 = this.translate.instant("recupera_senha.texto_1");
      this.trans.texto_2 = this.translate.instant("recupera_senha.texto_2");
      // this.trans.email                  = this.translate.instant("recupera_senha.texto_2");
      //this.trans.lang       = this.language;

      //this.events.publish('dados',this.data);
      this.events.publish('trans', this.trans);
      this.events.publish('lang', this.language);
      // this.events.publish('dados',this.data);
    }, 250);

  }
  // redirect push enter
  redirectPush(notificationCode) {
    console.log(notificationCode);

    let sendData = {
      liberado: false, origem: 1, token: this.token, lang: this.language,
      code: notificationCode,
      latitude: this.endLat, longitude: this.endLong,
      telephone: this.global.myGlobalVar

    };
    this.navCtrl.push('RedirectPage', { data: sendData });

    // this.navCtrl.push('DetalheCodePage', sendData);
    console.log('notifcacao codes com gps');

  }


  trogle_idiome_onesignal() {
    console.log("langsdfds", this.language);
    if (this.language == 'pt') {
      this.btn_fechar = "Fechar";
      this.btn_ircode = "Ir para Code";

    } else if (this.language == 'de') {
      this.btn_fechar = "Schliessen";
      this.btn_ircode = "Gehe zu CODE";
    } else if (this.language == 'en') {
      this.btn_fechar = "Close";
      this.btn_ircode = "Go to CODE";
    } else if (this.language == 'it') {
      this.btn_fechar = "Vicino";
      this.btn_ircode = "Vai al  CODE";
    } else if (this.language == 'fr') {

      this.btn_fechar = "Proche";
      this.btn_ircode = "Aller à CODE";
    } else if (this.language == 'es') {
      this.btn_fechar = "Cerca";
      this.btn_ircode = "Ir a CODE";
    }
  }

  netFail() {
    let result: any = [];
    result.message = "Sem conexão com a internet."
    this.toast.create({ message: result.message, position: 'botton', duration: 14400, closeButtonText: 'Ok!', cssClass: 'error' }).present();
  }

  getDeviceInfo() {
    // novo information
    console.log();
  }

  setFocusField() {
    this.myInput.setFocus();
    this.keyboard.show();
    console.log('Acessando o connect');
  }

}
