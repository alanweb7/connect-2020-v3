import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, ModalController, App, AlertController, Alert, ActionSheetController, MenuController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SqliteHelperService } from '../providers/sqlite-helper/sqlite-helper.service';
import { UsuarioService } from '../providers/movie/usuario.service';
import { Deeplinks } from "@ionic-native/deeplinks";
import { TranslateConfigService } from '../providers/lang-translate-config/translate-config.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(ViewController) viewCtrl: ViewController;

  private alert: Alert;
  rootPage: any = 'HomePage';
  mostra: Boolean;
  id_serv: Number;
  name: String;
  sobrenome: String;
  email: String;
  photo: String;
  tp_pessoa: String;
  cpf: String;
  cnpj: String;
  cep: String;
  endereco: String;
  numero: String;
  complemento: String;
  bairro: String;
  cidade: String;
  estado: String;
  telefone: String;
  celular: String;
  usuario: String;
  logado: String;
  token: String;
  login: String;
  home: String;
  codes: String;
  favoritos: String;
  pesquisa: String;
  sair: String;
  historico: String;
  btn_cancelar: String;
  btn_excluir: String;
  excluir_msg: String;
  msg_erro: String;
  msg_exlcuir: String;
  visite_code: String;
  public title: string;
  public description: string;
  public language: string;
  page_pesquisa: String;
  msg_servidor;
  load_aguarde;
  nome_mc: String;
  sobrenome_mc: String;
  email_mc: String;
  empresa: String;
  segmento: String;
  cep_mc: String;
  cidade_mc: String;
  estado_mc: String;
  page: String
  btn_salvar: String;
  //tradução login
  selectedLanguage;
  page_login: any;
  load_enviando: any;
  campo_obrigatorio: any;
  frase: any;
  senha: any;
  esqueceu: any;
  ou: any;
  conta: any;
  email_login: any;
  pageOrigem = false;
  isOpenSegment: boolean = false;
  termoPesquisa;


  pages: Array<{ color: string, icon: string, title: String, component: any }>;
  constructor(
    private usuarioService: UsuarioService,
    public platform: Platform,
    private event: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private usuarioDB: UsuarioService,
    public sqliteHelperService: SqliteHelperService,
    public app: App,
    private deeplinks: Deeplinks,
    public alertCtrl: AlertController,
    private translateService: TranslateService,
    private translateConfigService: TranslateConfigService,
    private actionSheetCtrl: ActionSheetController,
    private menu: MenuController,

  ) {

    platform.ready().then(() => {

      deeplinks.routeWithNavController(this.nav, {
        '/card': { 'card': 'DetalheCodePage', },
        '/about-us': { 'card': 'DetalheCodePage' },
      }).subscribe((match) => {
        var code = match.$link.queryString.substring(5, 50);
        console.log("mene", match);
        if (code != "" && code != undefined) {
          this.redirectPush(code);
        }
        console.log('Successfully routed', match.$link.queryString.substring(4, 50));
        console.log('Successfully routed', match.$link.queryString);
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
        // this.navCtrl.setRoot("HomePage",{token:this.token});
      });

    });

    this.initializeApp();


    this.event.subscribe("trans", (trans: any) => {
      console.log("Traduções em app.component.ts", trans);
      this.login = trans.login;
      this.home = trans.home;
      this.favoritos = trans.favoritos;
      this.pesquisa = trans.pesquisa;
      this.codes = trans.codes;
      this.sair = trans.sair;
      this.page_pesquisa = trans.page_pesquisa;
      this.load_aguarde = trans.load_aguarde;
      this.msg_servidor = trans.msg_servidor;
      this.nome_mc = trans.nome;
      this.sobrenome_mc = trans.sobrenome;
      this.email_mc = trans.email;
      this.empresa = trans.empresa;
      this.segmento = trans.segmento;
      this.cep_mc = trans.cep;
      this.cidade_mc = trans.cidade;
      this.estado_mc = trans.estado;
      this.page = trans.page_conta;
      this.btn_salvar = trans.btn_salvar;
      this.page_login = trans.page_login;
      this.load_enviando = trans.load_enviando;
      this.campo_obrigatorio = trans.campo_obrigatorio;
      this.frase = trans.frase;
      this.senha = trans.senha;
      this.esqueceu = trans.esqueceu;
      this.ou = trans.ou;
      this.conta = trans.conta;
      this.email_login = trans.usuario;

    });

    this.event.subscribe("lang", (lang: any) => {
      console.log("definição de linguagem no app.component.ts", lang);
      this.language = lang;
    });

    if (!this.language) {
      this.selectedLanguage = this.translateService.getBrowserLang();
      console.log('Sem linguagem definida!');
      console.log('Linguagem do browser: ', this.selectedLanguage);
      this.event.publish('lang', this.selectedLanguage);
    }

    this.event.subscribe("isOpenSegment", (openSegment: any) => {
      if (openSegment) {
        console.log('Status do isOpenSegment', openSegment);

        this.isOpenSegment = true;
      }

    });

    //capturar do evento 
    this.event.subscribe("pageOrigem", (data: any) => {

      console.log('Origem dos dados: ', data);
      this.pageOrigem = data.pageOrigem;
      this.termoPesquisa = data.termoPesquisa;

    });

    //capturar do evento da home
    this.event.subscribe("dados", (data: any) => {
      console.log(data);
      if (data.logado == "1") {
        this.name = data.name;
        this.token = data.token;
        this.email = data.email;
        this.usuario = data.usuario;
        this.id_serv = data.id_serv;
        this.sobrenome = data.sobrenome;
        this.photo = data.photo;
        this.mostra = true;
        this.cnpj = data.cnpj;
        console.log(data.cnpj);
        this.tp_pessoa = data.tp_pessoa;


      } else {
        this.mostra = false;
        this.photo = "";
        this.name = "";
        this.token = undefined;
        this.email = "";
        this.usuario = "";
        this.id_serv = 0;
        this.sobrenome = "";
        this.cnpj = "";
        this.tp_pessoa = "";


      }

    });
    // aqui eu seto o meu menu
    this.pages = [
      { color: 'primary', icon: 'home', title: String(this.home), component: 'HomePage' },
      { color: 'primary', icon: 'contact', title: String(this.codes), component: 'MeusCodesPage' },
      { color: 'primary', icon: 'star', title: String(this.favoritos), component: 'HistoricoPage' },
      { color: 'primary', icon: 'search', title: String(this.pesquisa), component: 'PesquisaPage' },
      // { color:'primary',  icon: 'search',             title: 'Pesquisa',            component: 'EnqueteVotarPage' },
      /*  { color:'primary',  icon: 'search',             title: 'Enquete',             component: 'EnqueteVotarPage' }
      */
    ];
    console.log(this.pages);
  }


  initializeApp() {


    console.log('initializeApp in app.component');

    this.platform.ready().then(() => {

      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();

      console.log('Dados da pagina de origem: ', activeView.name);


      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('ios')) {
        this.sqliteHelperService.getDb()
          .then((movies: any) => {

          }).catch((erro) => {

          });
      }

    });


    this.platform.registerBackButtonAction(async () => {

      // close side menu
      try {
        console.log("Primeiro try");

        const element = await this.menu.getOpen();
        if (element) {
          console.log('fechando o menu: ', element);
          this.menu.close();
          return;

        }

      } catch (error) {

      }

      try {

        console.log('seguindo com o botao voltar');

        // Catches the active view
        let navg = this.app.getActiveNavs()[0];
        let activeView = navg.getActive();
        // Checks if can go back before show up the alert
        if (activeView.name === 'HomePage') {
          if (this.nav.canGoBack()) {
            console.log('Acessou o canGoBack!');

            this.nav.pop();
          }
          else {
            const alert = this.alertCtrl.create({
              title: 'Sair do Connect?',
              message: 'Você tem certeza?',
              buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('** Saída do App Cancelada! **');
                }
              }, {
                text: 'Fechar o App',
                handler: () => {
                  console.log('** Apertou sair do app! **');
                  // this.logout();
                  this.platform.exitApp();
                }
              }]
            });
            alert.present();
          }

        } else if (activeView.name === 'MeusCodesPage') {


          console.log('Apertando voltar em Meus-codes');
          return;

        }
        else if (activeView.name === 'MenuCodePage') {

          if (this.isOpenSegment) {
            this.event.publish('closeSegment', true);
            this.isOpenSegment = false;
            return;
          }

          console.log('Apertando voltar em Menu-code');
          this.nav.pop().then(() => {
            console.log('Vontando uma etapa');

          });
          return;

        }
        else if (activeView.name === 'DetalheCodePage') {

          this.nav.setRoot(this.pageOrigem ? this.pageOrigem : 'HomePage', { token: this.token, lang: this.language, origem: activeView.name, termoPesquisa: this.termoPesquisa }).then(() => {
            console.log('Vontando app.component para: ', this.pageOrigem);
          });
          console.log('Apertando voltar em DetalheCodePage');

          return;
        }
        else {

          console.log('Vontando app.component');

          this.nav.pop().then(() => {
            console.log('Vontando app.component');

          });

        }

        // this.nav.pop().then(() => {
        //   console.log('Vontando fora do if rm app.component');

        // });

      } catch (error) {

      }

    });

    this.sobrenome = "";
    this.photo = "";
    this.email = "";
  }



  // redirect push enter
  redirectPush(notificationCode) {


    let sendData = {
      liberado: false,
      code: notificationCode,
      latitude: "", longitude: "",
      telephone: ""

    };
    this.nav.push('RedirectPage', { data: sendData });

    //  this.nav.push('DetalheCodePage', sendData);
  }
  openPage(page) {
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();

    let DestinationPage = 'MeusCodesPage';
    let currentIndex = this.nav.getActive().index;
    console.log('Página de origem: ', activeView.name);

    if (page == 2) {
      DestinationPage = 'MeusCodesPage';
      if (this.token == undefined) {

        this.nav.setRoot('LoginPage', { lang: this.language, origem: activeView.name });

      } else {

        this.nav.setRoot(DestinationPage, { token: this.token, lang: this.language, origem: activeView.name }).then(() => {
          this.nav.remove(currentIndex);
        });

        // this.nav.setRoot("MeusCodesPage", { token: this.token, lang: this.language });
      }
    } else if (page == 1) {
      this.nav.setRoot("HomePage", { token: this.token });
    }
    else if (page == 3) {
      this.nav.setRoot("HistoricoPage", { token: this.token, lang: this.language });
    } else if (page == 4) {
      this.nav.setRoot("PesquisaPage", {
        token: this.token, page_pesquisa: this.page_pesquisa, load_aguarde: this.load_aguarde,
        msg_servidor: this.msg_servidor
      });
    }
    else if (page == 'CodePesquisaPage') {

      let sendData = {
        token: this.token, page_pesquisa: this.page_pesquisa, load_aguarde: this.load_aguarde,
        msg_servidor: this.msg_servidor
      }
      this.nav.setRoot("CodePesquisaPage", sendData);
    }

    else if (page == 5) {
      this.nav.push("BonusPage", {
        token: this.token, lang: this.language, page_pesquisa: this.page_pesquisa, load_aguarde: this.load_aguarde,
        msg_servidor: this.msg_servidor
      });
    }
    else if (page == 6) {
      this.nav.push("CupomPage", {
        token: this.token, page_pesquisa: this.page_pesquisa, load_aguarde: this.load_aguarde,
        msg_servidor: this.msg_servidor, cupom: this.cnpj
      });
    }
    else if (page == 77) {
      this.nav.push("DebugPage", {
        token: this.token, page_pesquisa: this.page_pesquisa, load_aguarde: this.load_aguarde,
        msg_servidor: this.msg_servidor, cupom: this.cnpj
      });
    }
    else if (page == 78) {
      this.nav.push("SitePage", {
        channel: 'connect'
      });
    }

  }

  minhaConta() {
    console.log("token", this.token);
    if (this.token == undefined) {
      console.log("Linguagem minhaConta app.component", this.language)
      this.nav.push('LoginPage', { lang: this.language });
    } else {
      let myModal = this.modalCtrl.create('MinhaContaPage', {
        token: this.token, lang: this.language
        , nome: this.nome_mc
        , sobrenome: this.sobrenome_mc
        , email: this.email_mc
        , empresa: this.empresa
        , segmento: this.segmento
        , cep: this.cep_mc
        , cidade: this.cidade_mc
        , estado: this.estado_mc
        , page: this.page
        , btn_salvar: this.btn_salvar,
        msg_servidor: this.msg_servidor,
        load_aguarde: this.load_aguarde

      });
      myModal.present();
    }

  }
  loginIN() {
    this.nav.setRoot('LoginPage', { lang: this.language });
  }
  //sair eu atualizo os dados
  logout() {
    this.token = '';
    this.usuarioService.update(this.name, this.sobrenome, this.email, "", "", "", "0", this.token, this.id_serv)
      .then((data: any) => {
        if (data) {
          console.log('Dados do usuario: ', data)
          console.log("uusuario atualizado");
          this.nav.setRoot('HomePage');
        }
      });
  }
}
