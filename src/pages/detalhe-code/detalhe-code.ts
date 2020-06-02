import { Data } from './../minha-conta/minha-conta';
import { Facebook } from '@ionic-native/facebook';
import { GeolocationProvider } from './../../providers/geolocation/geolocation';
import { Component } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, LoadingController, Slides, ToastController, ViewController, ModalController, AlertController, Platform, Events, Content } from 'ionic-angular';
import { CodeProvider } from './../../providers/code/code';
import { ViewChild } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { BrowserTab } from '@ionic-native/browser-tab';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { NetworkProvider } from '../../providers/network/network';
import { HistoricoService } from '../../providers/historico/historico.service';
import { UtilService } from '../../providers/util/util.service';
import { CallNumber } from '@ionic-native/call-number';
//Import Model
import { Historico } from './../../models/historico.model';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from '../../providers/movie/usuario.service';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

import { FormBuilder, Validators } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { Clipboard } from '@ionic-native/clipboard';


@IonicPage({
  priority: 'low',
  segment: 'DetalheCode/:info/:liberado:/origem:/token/:btn_continuar/:btn_cancelar/:load_aguarde/:msg_servidor/:code_existe/:lang',
  defaultHistory: ['HomePage'],
})
@Component({
  selector: 'page-detalhe-code',
  templateUrl: 'detalhe-code.html',
})
export class DetalheCodePage {
  @ViewChild(Navbar) navBar: Navbar;
  barMidias;

  editorInit: any;
  galeria: any[];
  album_vimeo: any[];
  videoColection: any[];
  audio_colection: any[];
  titulo: String;
  descricao: String;
  subscribers: Number;
  c_email: String;
  website: String;
  facebookUser: String;
  instagramUser: String;
  nome_documento: String;
  documento: any[];
  tel_whatsapp: String;
  tel_contato: String;
  pais: String;
  page: String;
  info: any;
  TagRegCode: any;
  TagRegSlug: any;
  persistentData: any;
  trustedVideoUrl: SafeResourceUrl;
  video_found: any = false;
  calling_code: String;
  password: String;
  isprivate: Boolean;
  isLiberado: Boolean;
  video_post_status: any;
  origem: Number;
  video_link: String;
  audio_link: String;
  ask_info: String;
  option1: String;
  option2: String;
  label1: String;
  label2: String;
  iosPlatform: boolean;
  currentSlide: number = 0;
  totalSlides: number;
  disableNext: boolean = false;
  disablePrev: boolean = true;
  infoLegendSlides: string;
  video_status: any;

  @ViewChild('slider') slides: Slides;
  token: String;
  mostra: Boolean;
  ask_id: String;
  code_id: String;
  facebook: any[];
  instagram: any[];
  whatsapp: any[];
  fone: any[];
  email: any[];
  linkedin: any[];
  site: any[];
  whats: any[];
  word = /[^0-9]+/g;
  linked: String;
  video: HTMLElement = document.getElementById('myVideo');
  load_aguarde: any;
  msg_erro: any;
  lang: any;
  selecione: any;
  btn_cancelar: any;
  btn_continuar: any;
  code_existe: any;
  vews;
  telephone: any;
  latitude: any;
  longitude: any;
  btn_fechar: string;
  btn_ircode: string;
  msg_code: any;
  msg_link: string;
  sim: any;
  nao: any;
  initModeUser: any;
  audiolinkUrl: string;
  audioContent: boolean;
  docContent: boolean;
  hotspotContent: boolean;
  alertModal: any;
  public logo_header: string;

  // configuracoes do hotspot
  public hotspotVerify: boolean;
  public userHotspotForm: any;
  public emailHotspot: string;
  public passwordHotspot: string;
  public player_id: string;
  message = [];
  messageError: any = {};
  isError: boolean;
  public showAdress: boolean = false;
  public coordenates: string;
  public addresUser: object;
  public showDataWifi: boolean;

  hotspotData = new HotspotData();
  isConnected: boolean;
  hotSpotConnMens: string;
  hotspotActive: boolean;
  inConnect: boolean;
  activeForm: boolean = false;
  globalAction: string;
  showParts = new ShowParts();
  pageOrigem;
  termoPesquisa;

  // configuracoes de conteudo externo
  public webContent:any;
  public activeWebContent: boolean;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private codeProvider: CodeProvider,
    private browserTab: BrowserTab,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    public net: NetworkProvider,
    private historico: HistoricoService,
    private oneSignal: OneSignal,
    private emailComposer: EmailComposer,
    public util: UtilService,
    public modalCtrl: ModalController,
    private usuario: UsuarioService,
    public alertCtrl: AlertController,
    private nativeStorage: Storage,
    private callNumber: CallNumber,
    private translate: TranslateService,
    private platform: Platform,
    private streamingMedia: StreamingMedia,
    public formBuilder: FormBuilder,
    private locationAccuracy: LocationAccuracy,
    private geoProv: GeolocationProvider,
    private fb: Facebook,
    private clipboard: Clipboard,
    private event: Events,
    private sanitizer: DomSanitizer,

  ) {

    //capturar do evento 

    this.pageOrigem = this.navParams.get('pageOrigem');
    this.termoPesquisa = this.navParams.get('termoPesquisa');
    console.log('Página de origem recebida:', this.pageOrigem);

    this.userHotspotForm = formBuilder.group({
      nome: ['', ''],
      email: ['', ''],
      fone: ['', ''],
      idade: ['', ''],
      sexo: ['', ''],
      cidade: ['', ''],
      bairro: ['', ''],
      endereco: ['', ''],
    });

    this.setLanguage();
    this.getInitialconfig();
    this.audioContent = true;
    this.audiolinkUrl = 'http://soundbible.com/grab.php?id=2196&type=mp3';
    this.initModeUser = {
      menubar: false,
      inline: true,
      toolbar: false,
      readonly: true,
    }

    if (this.platform.is('ios')) {
      this.iosPlatform = true;
    }
    this.platform.ready().then((res) => {

      this.myPlayerIdOnesignal();

    });


  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      console.log('Clicando btn voltar');

      this.navCtrl.setRoot(this.pageOrigem);
    }

  }

  // saindo da pagina
  ionViewWillLeave() {
    console.log('Saindo da página detalhe-code: ');
    let dataUser = { pageOrigem: false };
    this.event.publish('pageOrigem', dataUser);
  }

  //iniciacao da tradução
  private _translateLanguage(): void {
    this.translate.use(this.lang);

    this._initialiseTranslation();
  }
  //traducao
  private _initialiseTranslation(): void {
    setTimeout(() => {


      this.load_aguarde = this.translate.instant("default.load_aguarde");
      this.msg_erro = this.translate.instant("default.msg_erro");
      this.selecione = this.translate.instant("videos.selecione");
      this.btn_cancelar = this.translate.instant("default.btn_cancelar");
      this.btn_continuar = this.translate.instant("default.btn_continuar");
      this.code_existe = this.translate.instant("home.code_existe");
      this.btn_ircode = this.translate.instant("default.btn_ircode");
      this.btn_fechar = this.translate.instant("default.btn_fechar");
      this.msg_code = this.translate.instant("default.msg_code");
      this.msg_link = this.translate.instant("default.msg_link");
      this.sim = this.translate.instant("default.sim");
      this.nao = this.translate.instant("default.nao");


    }, 250);
  }
  async presentAlertPrompt(message) {
    // this.alertModal = true;
    if (!message) {
      message = '<strong>Área restrita:</strong> Digite a senha.';
    }

    const myModal = await this.alertCtrl.create({
      subTitle: message,
      inputs: [
        {
          name: 'password',
          type: 'text',
          placeholder: 'Digite uma senha'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            let infoData = {
              'action': 'cancel',
            };
            this.validatePass(infoData);
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Validar Senha',
          handler: (data) => {
            let infoData = {
              'action': 'validate',
              'data': data
            };
            this.validatePass(infoData);
            console.log('Confirm Ok', infoData);
          }
        }
      ],
      enableBackdropDismiss: false
    });

    this.alertModal = myModal;

    await myModal.present();
  }

  validatePass(info: any) {
    console.log(info);

    let action = info.action;

    switch (action) {
      case 'validate':
        this.util.showLoading('Aguarde...');
        let password = info.data.password;
        let codeID: any = this.code_id;

        console.log('codeID na funcao do validate Pass: ', codeID);

        this.codeProvider.getCodePassword(password, codeID, 'pt')
          .then(
            (result: any) => {
              console.log('Dados retornados da senha: ', result);
              if (result.status == 200) {
                this.continueLoad(this.persistentData);
              } else {
                let message = 'Erro de senha. Tente novamente...';
                this.presentAlertPrompt(message);
              }
            });
        break;
      case 'cancel':

        this.navCtrl.setRoot('HomePage', { data: 'cancel' });
        this.util.loading.dismissAll();

        break;

      default:
        break;
    }

  }


  async getCode() {
 
    this.codeProvider.getAll(this.page, this.telephone, this.latitude, this.longitude)
      .then(async (res: any) => {
        this.util.loading.dismissAll();
        console.log('Data total no getCode: ', res);

        this.persistentData = res;

        this.code_id = res.data[0].id;
        this.hotspotData = res.data[0].hotspot;


        if (res.data[0]['isprivate'] == true) {
          this.presentAlertPrompt(null);
        } else {

          this.continueLoad(res);

        }

      }).catch((res) => {
        this.util.loading.dismissAll();
        console.log('Entrou no cath do detail code: ', res);

      }), (error) => {
        console.log('Entrou no error detail code 382:: ', error);

        this.toast.create({ message: this.msg_erro, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' }).present();
        this.util.loading.dismissAll();
        this.navCtrl.setRoot('HomePage');

      };

  }


  async continueLoad(res) {

    this.page = null;
    let isActived = {
      audio: false,
      doc: false,
      hotspot: false,
    };

    let result: any = res;
    if (result.status === 200) {
      this.util.loading.dismissAll();
      console.log('result total: ', result);

      this.myIdOnesignal();
      // if( this.isLiberado == true &&  result.data[0].t_conteudo == "1"  && result.data[0]['isprivate'] == true){
      // }
      //code senha é um link
      if (result.data[0].t_conteudo == "2") {
        //  else if( result.data[0].t_conteudo == "2"){
        //  else if( this.isLiberado == true &&  result.data[0].t_conteudo == "2"){
        //  await this.util.loading.dismissAll();
        await this.openWithInAppBrowser(result.data[0].link);

        await this.navCtrl.setRoot('HomePage', { modalIsOpen: true });

      }


      if (result.data[0]['galeria'].length > 0) {
        this.createORupdateHistorico(result.data[0].id, result.data[0].code, result.data[0].titulo, result.data[0]['galeria'][0].img_link, result.data[0].card);

      }
      //testa se meu retorno da API é vazio
      this.titulo = result.data[0]['titulo'];
      this.descricao = this.decode(result.data[0].descricao);
      this.subscribers = result.data[0].subscribers;

      this.nome_documento = result.data[0]['nome_documento'];
      // this.documento        = result.data[0]['documento'];
      this.pais = result.data[0]['pais'];
      this.isprivate = result.data[0]['isprivate'];
      this.TagRegCode = result.data[0]['code'];
      this.TagRegSlug = result.data[0]['slug'];
      this.ask_id = result.data[0]['ask_code']['ask_id'];
      this.code_id = result.data[0].id;
      this.ask_info = result.data[0]['ask_code']['ask_info'];
      this.option1 = result.data[0]['ask_code']['ask_results']['option1'];
      this.option2 = result.data[0]['ask_code']['ask_results']['option2'];
      this.label1 = result.data[0]['ask_code']['ask_results']['label1'];
      this.label2 = result.data[0]['ask_code']['ask_results']['label2'];
      ///inserindo os array de contatos
      this.whatsapp = result.data[0]['code_sectors']['whatsapp'];
      this.facebook = result.data[0]['code_sectors']['facebook'];
      this.instagram = result.data[0]['code_sectors']['instagram'];
      this.fone = result.data[0]['code_sectors']['telefone'];
      this.email = result.data[0]['code_sectors']['email'];
      this.linkedin = result.data[0]['code_sectors']['linkedin'];
      this.site = result.data[0]['code_sectors']['site'];
      this.vews = result.data[0]['vews'];

      // renderizando o web Content
      if(result.data[0].activeWebContent){
        this.webContent = result.data[0].webContent;
      }

      //tratamento do contatos preenchendo os arrays
      if (this.whatsapp.length > 0) {
        this.tel_whatsapp = this.whatsapp[0].conteudo;
        this.calling_code = this.whatsapp[0].calling_code;
      }
      if (this.fone.length > 0) {
        this.tel_contato = this.fone[0].conteudo;

      }
      if (this.email.length > 0) {
        this.c_email = this.email[0].conteudo;
      }
      if (this.site.length > 0) {
        this.website = this.site[0].conteudo;
      }
      if (this.facebook.length > 0) {
        this.facebookUser = this.facebook[0].conteudo;
      }
      if (this.instagram.length > 0) {
        this.instagramUser = this.instagram[0].conteudo;
      }
      if (this.linkedin.length > 0) {
        this.linked = this.linkedin[0].conteudo;
      }
      //cria o local storage para id da enquete
      if (this.ask_id != "" && this.ask_id != null) {
        let item = this.ask_id + "-" + this.code_id;
        this.nativeStorage.set(item, 0);
      }
      //popula imagem

      this.video_found = true;
      if (result.data[0]['galeria'].length > 0) {
        for (var i = 0; i < result.data[0]['galeria'].length; i++) {
          var gal = result.data[0]['galeria'][i];

          this.galeria.push(gal);

        }

        this.logo_header = this.galeria[0].img_link;
        console.log('Imagens da header: ', this.logo_header);

      }
      //popula documento
      this.docContent = false;
      if (result.data[0]['documento'].length > 0) {
        this.docContent = true;
        for (var i = 0; i < result.data[0]['documento'].length; i++) {
          var doc = result.data[0]['documento'][i];
          this.documento.push(doc);

        }
      }

      //popula video
      if (result.data[0]['album_vimeo'].length > 0) {
        console.log('video colection: ', result.data[0]['album_vimeo']);
        this.videoColection = result.data[0]['album_vimeo'];
        for (var i = 0; i < result.data[0]['album_vimeo'].length; i++) {
          let vid = result.data[0]['album_vimeo'][i];
          let img = '';
          if (vid.video_pictures) {
            img = vid.video_pictures.replace('?r=pad', '');
          }

          vid.video_pictures = img;

          if (vid.post_status == "complete") {
            vid.video_link = this.domSanitizer.bypassSecurityTrustResourceUrl(vid.video_link);

          }
          this.album_vimeo.push(vid);
          if (i == 0) {
            this.video_link = vid.video_link;
            this.mostra = true;
            this.video_post_status = vid.post_status;
          }


        }
      }

      console.log('Galaeria de videos: ', this.album_vimeo);

      this.totalSlides = this.album_vimeo.length;
      if (this.totalSlides > 0) {

        this.video_status = this.album_vimeo[0].post_status;
        this.video_link = this.album_vimeo[0].video_link;

      }
      this.infoLegendSlides = '1/' + this.totalSlides;
      this.currentSlide = 0;
      //popula audio
      this.audioContent = false;
      if (result.data[0]['audio_colection'].length > 0) {
        this.audioContent = true;
        this.audio_colection = result.data[0]['audio_colection'];

      }
    } else {
      this.util.loading.dismissAll();
      this.navCtrl.setRoot('HomePage', { 'error': result });
    }

    this.barMidias = await [
      { name: 'AUDIOS', icon: 'tools-audio', isActived: this.audioContent, action: 'audio' },
      { name: 'DOCUMENTOS', icon: 'tools-doc', isActived: this.docContent, action: 'doc' },
      // { name: 'WI-FI', icon: 'tools-wifi', isActived: this.hotspotVerify, action: 'hotspot' }
    ];

    let filterTools = [];
    console.log("status do this.hotspotVerify: ", this.hotspotVerify);

    for (let index = 0; index < this.barMidias.length; index++) {
      const element = this.barMidias[index];
      console.log(element.name, ' Está ativo: ', element.isActived);
      if (element.isActived) {
        filterTools.push(element);
      }
    }

    this.barMidias = filterTools;



  }

  selectTipo(tipo) {
    if (tipo == 0) {
      this.showCheckbox(tipo, this.whatsapp);
    } else if (tipo == 1) {
      this.showCheckbox(tipo, this.fone);
    } else if (tipo == 2) {
      this.showCheckbox(tipo, this.email);
    }
    else if (tipo == 3) {
      this.showCheckbox(tipo, this.site);
    }
    else if (tipo == 4) {
      this.showCheckbox(tipo, this.facebook);
    }
    else if (tipo == 5) {
      this.showCheckbox(tipo, this.instagram);
    } else if (tipo == 6) {
      this.showCheckbox(tipo, this.linkedin);
    }
  }
  selectTipo2(tipo) {
    if (tipo == 0) {
      this.openWithInAppBrowser(this.whatsapp);
    } else if (tipo == 1) {
      this.openWithInAppBrowser(this.fone);
    } else if (tipo == 2) {
      this.openWithInAppBrowser(this.email);
    }
    else if (tipo == 3) {
      this.openWithInAppBrowser(this.site);
    }
    else if (tipo == 4) {
      this.openWithInAppBrowser(this.facebook);
    }
    else if (tipo == 5) {
      this.openWithInAppBrowser(this.instagram);
    } else if (tipo == 6) {
      this.openWithInAppBrowser(this.linkedin);
    }
  }
  showCheckbox(tp, tipo) {
    let alert = this.alertCtrl.create();
    alert.setTitle(this.selecione);
    for (var i = 0; i < tipo.length; i++) {
      alert.addInput({
        type: 'radio',
        label: tipo[i].titulo,
        value: tipo[i].conteudo,
        checked: false
      });
    }

    alert.addButton(this.btn_cancelar);
    alert.addButton({
      text: this.btn_continuar,

      handler: data => {

        if (tp == 1) {
          data = data.replace(this.word, '');
          //url = "tel:"+tipo;

          this.callNumber.callNumber(data, false)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        } else {
          this.openWithInAppBrowser2(tp, data);

        }

      }
    });
    alert.present();
  }
  filterItems(searchTerm) {
    return this.whatsapp.filter((item) => {
      return item.conteudo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  setFilteredItems(data) {
    this.whats = this.filterItems(data);


    this.calling_code = this.whats[0].calling_code.replace("+", '');
    console.log(this.whats[0]);

  }

  handleIFrameLoadEvent(): void {

  }

  viewPhoto(img) {
    console.log('Visualizar imagem: ', img);
    this.photoViewer.show(img);
  }

  presentMidiaModal(action) {
    let areaData;

    switch (action) {
      case 'audio':
        areaData = this.audio_colection;
        break;
      case 'doc':
        areaData = this.documento;
        break;

      default:
        break;
    }

    let infoData = {
      area: action,
      colection: areaData
    };

    let profileModal = this.modalCtrl.create('MidiasPage', { infoData: infoData });
    profileModal.onDidDismiss(data => {
      console.log('Dados retornados do modal: ', data);

      if (!data.dismissed) {
        let html = 'Dados recebidos do modal';
      }
      return;
    });

    profileModal.present();

  }

  mostraEnquete() {
    let myModal = this.modalCtrl.create('EnqueteVotarPage', { ask_id: this.ask_id, code_id: this.code_id });
    myModal.present();
  }

  resultEnq() {

    let myModal = this.modalCtrl.create('EnqueteGraphPage', { ask_id: this.ask_id, code_id: this.code_id, question: this.ask_info, option1: this.option1, option2: this.option2, label1: this.label1, label2: this.label2 });
    myModal.present();
  }
  createORupdateHistorico(id, code, titulo, img, card) {
    let contextHist: Historico;
    //grava o historico
    this.historico.getById(id)
      .then((existe: Number) => {
                
        if (existe < 0) {
          contextHist = new Historico(id, code, titulo, img, card);
          //grava historico no banco de dados local
          
          this.historico.create(contextHist)
            .then((data: any) => { });
        } else {
          //grava historico no banco de dados local
          
          this.historico.update(titulo, img, code, card, id)
            .then((data: any) => { });
        }

      });
  }
  openWithInAppBrowser(url) {
    console.log('abrir link: ', url);
    this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        }
      }).catch(erro => {
        this.toast.create({ message: 'A informação está incorreta', position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'alerta' }).present();

      });
  }

  // redirect push enter
  showLink(notificationCode) {
    const confirm = this.alertCtrl.create({
      title: this.msg_link,
      message: "",
      buttons: [
        {
          text: this.nao,
          handler: () => {

          }
        },
        {
          text: this.sim,
          handler: () => {
            //this.viewCtrl.dismiss();

            this.openWithInAppBrowser(notificationCode);
          }
        }
      ]
    });
    confirm.present();
  }
  showImageLink(id) {
    console.log('Dados recebidos na nova função do link da imagem:: ', id);
    let dataImg;
    this.galeria.forEach(imagem => {
      if (imagem.id == id) {
        dataImg = imagem;
      }

    });

    console.log('Dados da imagem encontrada: ', dataImg);
    let msgAction;
    let action = dataImg.code_ads.action;
    let type = dataImg.code_ads.action;
    let data = dataImg.code_ads;
    let img_link = dataImg.img_link;

    if (action && type) {
      switch (action) {
        case '1':
          msgAction = 'Deseja acessar este endereço?';
          break;
        case '2':
          msgAction = 'Você deseja enviar mensagem (whatsapp)?';
          break;
        case '3':
          msgAction = 'Você deseja fazer ligação para este anúncio?';
          break;

      }

      const confirm = this.alertCtrl.create({
        title: msgAction,
        message: "",
        buttons: [
          {
            text: this.nao,
            handler: () => {

            }
          },
          {
            text: this.sim,
            handler: () => {
              //this.viewCtrl.dismiss();
              console.log('Dados recebidos na função ::: ', data);
              this.redirectLinkImage(data);
            }
          }
        ]
      });
      confirm.present();
    } else {

      this.viewPhoto(img_link);


    }


  }


  redirectLinkImage(data) {
    console.log('Dados recebidos na função redirectLinkImage::: ', data);
    console.log('Codigo do pais na função redirectLinkImage::: ', this.calling_code);
    let getAction = data.action ? data.action : data;
    /** 1 = link, 2 = whatsapp, 3 = telefone */
    switch (getAction) {
      case '1':
        console.log('Case 1 em redirectLinkImage');
        this.openWithInAppBrowser(data.link_ads);
        break;
      case '2':
        console.log('Case 2 em redirectLinkImage');
        let CodeCountri: any = '55';
        if (this.calling_code != '') {
          CodeCountri = this.calling_code.replace('+', '');
        }
        let direction = 'http://api.whatsapp.com/send?1=pt_BR&phone=' + CodeCountri + data.link_ads;
        console.log('direction função redirectLinkImage::: ', direction);
        this.openWithInAppBrowser(direction);
        break;
      case '3':
        console.log('Case 3 em redirectLinkImage');
        // call number
        this.callNumber.callNumber(data.link_ads, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
        break;
      case 'audio':
      case 'doc':

        console.log('Case ', getAction, ' em redirectLinkImage');
        // call page audios (Modal)
        this.presentMidiaModal(getAction);

        break;
      case 'hotspot':
        console.log('Case ', getAction, ' em redirectLinkImage');

        // call page audios (Modal)
        if (!this.inConnect) {
          this.actionSpotConnect();
          this.inConnect = true;
        }

        break;
    }

  }

  openWithInAppBrowser2(tp, tipo) {
    let url;
    if (tp == 0) {
      this.setFilteredItems(tipo);
      tipo = tipo.replace(this.word, '');
      url = "http://api.whatsapp.com/send?1=pt_BR&phone=" + this.calling_code + tipo;

    }
    if (tp == 2) {
      url = "mailto:" + tipo;
      this.SetEmail(tipo);
    }
    else if (tp == 3) {
      url = tipo;
    }
    else if (tp == 4) {
      url = tipo;
    }
    else if (tp == 5) {
      url = tipo;
    } else if (tp == 6) {
      url = tipo;
    }
    this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          console.log(url);
          this.browserTab.openUrl(url).then(result => {
            console.log(result);
          }).catch(erro => {
            console.log(erro);
            this.toast.create({ message: 'A informação está incorreta', position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'alerta' }).present();

          });
        }
      })
  }
  SetEmail(Setemail) {
    let email = {
      to: Setemail,
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }

  myIdOnesignal() {
    this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');

    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {

      // registrando tags
      this.info = this.navParams.get('info');
      var tagCode = this.TagRegCode;
      var tagSlug = this.TagRegSlug;

      var dataTag = '{"' + tagCode + '":"true"}';
      var slugTag = '{"' + tagSlug + '":"true"}';
      var Tagcode = JSON.parse(dataTag);
      var TagSlug = JSON.parse(slugTag);

      console.log('Reristrando a TAG: ', slugTag);
      this.oneSignal.sendTags(Tagcode);
      this.oneSignal.sendTags(TagSlug);


      // alert.present();


    });


  }

  controlSlide(action) {

    this.video_status = null;

    if (action === 'up') {
      this.currentSlide++;
    } else {
      this.currentSlide--;
    }

    let indice = this.currentSlide + 1;

    if ((this.currentSlide + 1) === this.totalSlides) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }

    if (this.currentSlide === 0) {
      this.disablePrev = true;
      indice = 1;
    } else {
      this.disablePrev = false;
    }

    this.infoLegendSlides = indice + '/' + this.totalSlides;
    this.video_link = this.album_vimeo[this.currentSlide].video_link;
    this.video_status = this.album_vimeo[this.currentSlide].post_status;
    let file_name = this.album_vimeo[this.currentSlide].file_name;

    if (this.video_status == 1) {

      let file_ext = file_name.split(".");
      file_ext = file_ext.pop();

      console.log('Nome do video atual: ', file_name);
      console.log('Extensão do video atual: ', file_ext);

    }
    console.log('Link de video atual: ', this.video_link);

  }
  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Ok Video rodando') },
      errorCallback: () => { console.log('Erro ao inici o video') },
      orientation: 'portrait'
    }

    let linkVideo: any = this.video_link;

    this.streamingMedia.playVideo(linkVideo, options);
  }

  selectVideo(video_link, status) {
    this.video_link = video_link;
    this.mostra = true;
    this.video_post_status = status;

  }


  slideNext() {
    this.slides.slideNext();

  }

  slidePrev() {
    this.slides.slidePrev();
  }


  setLanguage() {
    this.platform.ready().then(() => {
      if (this.lang == undefined || this.lang == "" || this.lang == null) {
        //CHAMDA DO BANCO DE DADOS
        this.usuario.getAll()
          .then((movies: any) => {
            console.log(movies);
            if (movies.length == 1) {
              this.lang = movies[0].cpf;

              if (this.lang == "" || this.lang == undefined || this.lang == null) {
                this.lang = "pt";
              }
              this._translateLanguage();
            }
            else {
              this.lang = "pt";
              this._translateLanguage();
            }
          }).catch((error) => {

            this.lang = "pt";
            this._translateLanguage();
          });
      } else {
        this._translateLanguage();
      }
    });
  }
  getInitialconfig() {

    this.album_vimeo = [];
    this.galeria = [];
    this.documento = [];
    this.facebook = [];
    this.instagram = [];
    this.whatsapp = [];
    this.fone = [];
    this.email = [];
    this.linkedin = [];
    this.site = [];
    this.whats = [];
    this.page = this.navParams.get('code');
    this.telephone = this.navParams.get('telephone');
    this.latitude = this.navParams.get('latitude');
    this.longitude = this.navParams.get('longitude');
    this.isLiberado = this.navParams.get('liberado');
    this.origem = this.navParams.get('origem');
    this.token = this.navParams.get('token');
    this.lang = this.navParams.get('lang');

    this.mostra = false;
    this.historico.getAll().then((movies: any) => { });



    if (this.page != "" && this.page != undefined && this.page != "[object%20Object]") {
      this.getCode();
    }
    //  else{
    //     this.util.loading.dismissAll();
    //     this.viewCtrl.dismiss();
    //  }


  }
  hotspotAction(action = null) {
    let act = action;

    this.showParts = new ShowParts();
    switch (action) {
      case 'showName':

        this.showParts.userDetails = true;

        break;

      default:
        break;
    }

  }

  actionSpotConnect() {

    this.verifyGeolocationIsActive();

    // this.hotSpotConnMens = 'Conectando...';
    let dataHotspot = this.hotspotData;
    console.log('Dados do Hotspot: ', dataHotspot);

    if (dataHotspot.isRegisterScreen) {
      this.activeForm = true;
      this.inConnect = false;

      console.log('Abrindo formulário de conexão...');
    } else {

      this.hotspotConnect();

    }

  }
  async verifyGeolocationIsActive() {

    this.platform.ready().then(() => {
      // verifique a geolocalizacao
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        // if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            this.getAdsressUser();
          },
          error => console.log('Error requesting location permissions', error)
        );
        // }
      });
    });

  }

  getAdsressUser() {

    this.platform.ready().then(() => {
      this.geoProv.getGeolocation().then((resp: String[]) => {
        console.log('detalhe-code total geolocation:', resp);
        this.coordenates = resp["latitude"] + ',' + resp["longitude"];
        console.log('home geolocation: ', this.coordenates);

      });
    });


  }

  hotspotConnect() {

    console.log('Dados de conexão do hotspot no hotspotConnect: ', this.hotspotData);
    this.verifyGeolocationIsActive().then((resp) => {
      console.log('REsposta do localizador (Active): ', resp);

    }).catch((err) => {
      console.log('Erro ao ativar o localizador');
    });

    if (this.platform.is('ios')) {
      this.showDataWifi = true;
      this.activeForm = false;
      this.inConnect = true;
      this.isConnected = true;
    }

  }

  copyToTransfer() {
    this.clipboard.copy(this.hotspotData.password).then((res) => {
      alert('Senha copiada para a área de tranferência!');
    });
  }

  // login com facebook
  //método para chamar api do facebook e salvar no banco o usuario
  loginFacebook() {
    let permissions = new Array<string>();
    permissions = ['public_profile', 'email'];

    this.fb.login(permissions).then((response) => {
      let params = new Array<string>();

      this.fb.api("/me?fields=name,email", params)
        .then(res => {

          //estou usando o model para criar os usuarios
          console.log('Todos os dados retornados do facebook:', res);
          let usuario = new Usuario();
          usuario.nome = res.name;
          usuario.email = res.email;
          usuario.senha = res.id;
          usuario.login = res.email;

          this.userHotspotForm.value.id = res.id;
          this.userHotspotForm.value.nome = res.name;
          this.userHotspotForm.value.email = res.email;
          this.userHotspotForm.value.coordenates = this.coordenates;;
          this.showParts.userDetails = true;
          // this.hotSpotConnMens = 'Verifique seus dados e Clique eom Connect.';
          this.logar(usuario);
        }, (error) => {
          // alert(error);
          this.hotSpotConnMens = 'Erro! Tentar conectar com facebook.';
          console.log('ERRO LOGIN: ', error);
        })
    }, (error) => {
      // alert(error);
      console.log('ERRO FACEBOOK plugin: ', error);
      this.hotSpotConnMens = 'Erro! Tentar conectar com facebook!::';
    });
  }

  logar(usuario: Usuario) {
    let action = 'set_user';

    console.log('Usuario cadastrado via facebook: ', usuario);
    console.log('Gravando dados no servidor: ', this.userHotspotForm);

    // this.salvarService.salvarFacebook(usuario)
    //   .then(() => {
    //     console.log('Usuario cadastrado via facebook com sucesso!');
    //   })

  }

  async myPlayerIdOnesignal() {
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log(id.userId);
      this.player_id = id.userId;

      let dataTag = { "userId": id.userId };
      this.oneSignal.sendTags(dataTag);

      console.log('OneSignal Player ID: ', this.player_id);
    });


  }


  decode(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }



  backButtonEvent() {
    console.log('Origem page em detalhe-code: ', this.pageOrigem);


    if (this.pageOrigem) {
      this.navCtrl.setRoot(this.pageOrigem, { token: this.token, termoPesquisa: this.termoPesquisa });
    } else {
      this.navCtrl.setRoot('HomePage');
    }

  }

}

export class Model {

  constructor(objeto?) {
    Object.assign(this, objeto);
  }

}

export class Usuario extends Model {
  codigo: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
}

export class ShowParts {
  userDetails: boolean;
}
export class HotspotData {
  isHotspotActive: boolean;
  isOnlyHotspot: boolean;
  isRegisterScreen: boolean;
  password: string;
  ssid: string;
}


