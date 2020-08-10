import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Component, Inject, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events, Navbar, ViewController, Platform } from 'ionic-angular';
// import { FirebaseApp } from 'angularfire2';
//import firebase from 'firebase';
// import * as firebase from 'firebase';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture';

import { Camera, CameraOptions } from '@ionic-native/camera';

//import Provider
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
import { File, Entry } from '@ionic-native/file';

import { HTTP } from '@ionic-native/http';
import { FTP } from '@ionic-native/ftp';
import { NgZone } from '@angular/core';

import { Media, MediaObject } from '@ionic-native/media';
import { VideoEditor } from '@ionic-native/video-editor';

import { normalizeURL } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-vide-code-firebase',
  templateUrl: 'vide-code-firebase.html',
})
export class VideCodeFirebasePage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('myvideo') myVideo: any;
  referencia;
  arquivo;
  porc;
  total;
  uploadTask;
  token: any;
  id_code: any;
  videos: any[];
  public webSrc: any;
  package_codes: Number;
  package_name: String;
  package_videos: Number;
  porcentagem;
  ispause: String = "";
  isResume: String = "";
  isEnviando: boolean = false;
  isCancel: String = "";
  isConvertido: Number = 3;
  fullPath;
  selecionado: String = "true";
  name: string;
  //tradução
  lang;
  load_enviando: any;
  msg_servidor: any;
  btn_cancelar: any;
  page: any;
  load_aguarde: any;
  msg_exlcuir: any;
  btn_publicar: any;
  btn_excluir: any;
  msg_pacote: any;
  vencimento: any;
  pacote: any;
  dias: any;
  aviso: any;
  msg_video: string;
  sim: string;
  nao: string;
  enviado_video: string;
  outro_video: string;
  selecione_video: string;
  btn_pausar: any;
  btn_continuar: any;
  btn_enviar: any;
  selecione: any;
  enviando: any;
  fonteCapture: any;
  videoGallery: boolean;
  uploadedVideo: boolean;
  video: any;
  isGallery: boolean;
  fileUpload: any;
  inUpload: boolean;
  inProgress: boolean;
  isSelecionado: boolean = false;
  alertSuccess: boolean;

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  progressBar: any;

  public uploadPercent: number = 0;
  public ftp_remote_path: string;
  public FTPnewName: string;
  public ftp_host: string;
  public ftp_user: string;
  public ftp_password: string;

  constructor(
    // @Inject(FirebaseApp) fb: any,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public toast: ToastController,
    public file: File,
    public net: NetworkProvider,
    private codeProvider: CodeProvider,
    public util: UtilService,
    public viewCtrl: ViewController,
    public events: Events,
    private mediaCapture: MediaCapture,
    private camera: Camera,
    private http: HTTP,
    private fTP: FTP,
    public _zone: NgZone,
    private media: Media,
    public platform: Platform,
    private videoEditor: VideoEditor,
    private webview: WebView,
    private sanitize: DomSanitizer,
    private streamingMedia: StreamingMedia,
  ) {

    // this.referencia = firebase.storage().ref();
    this.fonteCapture = this.navParams.get('font_capture');
    if (this.fonteCapture == 'camera') {
      this.isGallery = false;
      this.onRecordVideoFTP();
      // this.onRecordVideo();
    }
    if (this.fonteCapture == 'gravador') {
      this.isGallery = false;
      // this.startRecord();
      // this.onRecordAudioFTP();
    }
    if (this.fonteCapture == 'galeria') {
      this.isGallery = true;
      // this.someFunction();
    }


  }

  ionViewDidLoad() {
    console.log('Página acessada: ionViewDidLoad UploadPage');
    console.log('Fonte do video: ', this.fonteCapture);

    this.token = String;
    this.id_code = String;
    this.id_code = "";
    this.token = "";
    this.videos = [];
    this.package_codes = 0;
    this.name = "";
    this.package_name = "";

    this.videos = this.navParams.get('videos');
    this.token = this.navParams.get('token');
    this.id_code = this.navParams.get('code');
    this.package_codes = this.navParams.get('package_codes');
    this.package_name = this.navParams.get('package_name');
    this.package_videos = this.navParams.get('package_videos');
    this.lang = this.navParams.get('lang');
    this.load_enviando = this.navParams.get('load_enviando');
    this.msg_servidor = this.navParams.get('msg_servidor');
    this.btn_cancelar = this.navParams.get('btn_cancelar');
    this.page = this.navParams.get('page');
    this.load_aguarde = this.navParams.get('load_aguarde');
    this.msg_exlcuir = this.navParams.get('msg_exlcuir');
    this.btn_publicar = this.navParams.get('btn_publicar');
    this.btn_excluir = this.navParams.get('btn_excluir');
    this.msg_pacote = this.navParams.get('msg_pacote');
    this.vencimento = this.navParams.get('vencimento');
    this.pacote = this.navParams.get('pacote');
    this.dias = this.navParams.get('dias');
    this.aviso = this.navParams.get('aviso');
    this.msg_video = this.navParams.get('msg_video');
    this.sim = this.navParams.get('sim');
    this.nao = this.navParams.get('nao');
    this.enviado_video = this.navParams.get('enviado_video');
    this.outro_video = this.navParams.get('outro_video');
    this.selecione_video = this.navParams.get('selecione_video');
    this.btn_pausar = this.navParams.get('btn_pausar');
    this.btn_continuar = this.navParams.get('btn_continuar');
    this.btn_enviar = this.navParams.get('btn_enviar');
    this.btn_enviar = this.navParams.get('btn_enviar');
    this.selecione = this.navParams.get('selecione');
    this.enviando = this.navParams.get('enviando');
    this.lang = this.navParams.get('lang');
    console.log(this.package_videos);
    /*   this.navBar.backButtonClick = (e:UIEvent)=>{
        this.events.publish('updateScreen');

       }   */
  }

  enviarArquivo() {
    console.log("Arquivo recebido na enviarArquivo:", this.arquivo);

    if (this.arquivo == "") {
      const alert = this.alertCtrl.create({
        title: this.aviso,
        subTitle: this.selecione_video,
        buttons: ['OK']
      });
      alert.present();

    } else {
      let caminho = this.referencia.child('pasta/' + this.arquivo.name);
      this.uploadTask = caminho.put(this.arquivo);
      this.uploadTask.on('state_changed', (snapshot) => {
        // Acompanha os estados do upload (progresso, pausado,...)
        console.log(snapshot);
        this.ispause = "true";
        this.isEnviando = false;
        this.selecionado = "";
        this.isCancel = "true";
        this.porc = snapshot.bytesTransferred;
        this.total = snapshot.totalBytes;
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.porcentagem = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.porcentagem = this.porcentagem.toPrecision(3);
        if (this.porcentagem == 100) {
          this.isCancel = "";
          this.isResume = "";
          this.ispause = "";
          this.arquivo = "";

          this.getUploadVideo(this.name);
          //this.getVideo(this.name);

          //this.toast.create({ message:  "O Vídeo foi enviado com sucesso !", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
        }
        console.log();
        //var splitted = this.porcentagem.split(".", 2);
        //  console.log(splitted);
        console.log('Upload is ' + this.porcentagem + '% done');
        switch (snapshot.state) {
          // case firebase.storage.TaskState.PAUSED: // or 'paused'
          //   console.log('Upload is paused');
          //   // this.isResume = "true";
          //   break;
          // case firebase.storage.TaskState.RUNNING: // or 'running'
          //   console.log('Upload is running');
          //   //this.ispause="true";
          //   //this.isResume = "";
          //   break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('unauthorized');
            this.isCancel = "";
            this.isEnviando = false;
            this.isResume = "";
            this.ispause = "";
            //this.toast.create({ message: this.erro_envio, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'erro'  }).present();

            break;

          case 'storage/canceled':
            // User canceled the upload
            console.log('cancelado');
            this.isCancel = "";
            this.isEnviando = false;
            this.isResume = "";
            this.ispause = "";
            //this.toast.create({ message:this.erro_envio, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'erro'  }).present();

            break;



          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('unknown');
            this.isCancel = "";
            this.isEnviando = false;
            this.isResume = "";
            this.ispause = "";
            //this.toast.create({ message: this.erro_envio, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'erro'  }).present();

            break;
        }
      });
    }


  }
  /// selecionar da galeria
  selectVideoFTP() {
    console.log('Função select vídeo');
    
    this.fonteCapture = 'galeria';
    this.videoGallery = true;
    let options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    // transcoder do video

    this.camera.getPicture(options)
      .then(async (videoUrl) => {
        console.log('Dados do vídeo: ', videoUrl);
        if (videoUrl) {
          // this.showLoader(); 
          let dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
          let filename = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);

          this.webSrc = dirpath + filename;
          console.log('Caminho do video webSrc: ', this.webSrc);


          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;


          console.log('Fixed: ' + this.webSrc);
          console.log('Normalize path: ', this.webSrc);

          console.log('videoUrl Original: ', videoUrl);
          console.log('dirpath Final: ', dirpath);
          console.log('filename: ', filename);

          this.fileUpload = videoUrl;

          if (this.platform.is('ios')) {

            this.transcoderVideo();

          } else {


            this.isSelecionado = true;
            this.uploadedVideo = null;

          }

          // try {

          //   this.util.loading.dismissAll();


          // } catch (err) {
          //   console.log('error 1');

          // }


        }// final if
      }, // final then
        (err) => {
          console.log(err);
        });
  }

  transcoderVideo() {

    const MyencoderVideo = this._zone;
    // const percentBar:number = 0;
    // const myTeste = this.myteste;
    // this.progressBar = percentBar;
    // this.myteste();

    this.util.showLoading('Preparando seu video! Aguarde....');


    this.videoEditor.transcodeVideo({
      fileUri: "file://" + this.fileUpload,
      outputFileName: "" + new Date().getTime(),
      outputFileType: this.videoEditor.OutputFileType.MPEG4,
      optimizeForNetworkUse: this.videoEditor.OptimizeForNetworkUse.YES,
      saveToLibrary: false,
      maintainAspectRatio: true,
      // videoBitrate: 7000000, // 5 megabit
      // audioChannels: 2,
      // audioSampleRate: 44100,
      // audioBitrate: 128000, // 128 kilobits,

      progress: function (info) {
        console.log('transcodeVideo progress callback, info: ' + info);
        console.log('transcodeVideo progress callback, info: ' + info * 100);

        var perc = Math.round(info * 100);

        const percentBar = perc;
        this.progressBar = percentBar;

        if (perc == 100) {

          console.log('file modificado xcom sucesso!');

        }


        setTimeout(() => {
          console.log('Test');

          //  return myTeste();

        }, 1000 / 60);



        MyencoderVideo.run(() => {

          console.log('wwwwwww: ');

        });


      }
    })
      .then((fileUri: string) => {
        this.util.loading.dismissAll();

        this.isSelecionado = true;
        this.uploadedVideo = null;

        this.fileUpload = fileUri;
        console.log('Arquivo Modificado: ', fileUri);

      }).catch((err) => {
        this.util.loading.dismissAll();
        console.log('erro ao fazer o trancoder: ', err);
      });


  }
  myteste() {
    this.progressBar = 30;
    console.log('função externa');
  }
  selectVideo() {
    this.fonteCapture = 'galeria';
    this.videoGallery = false;
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options)
      .then(async (videoUrl) => {
        if (videoUrl) {
          // this.showLoader();
          this.isSelecionado = true;
          this.util.showLoading('Aguarde...');
          this.uploadedVideo = null;

          let dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
          let filename = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);

          this.webSrc = dirpath + filename;
          console.log('Caminho do video webSrc: ', this.webSrc);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;


          console.log('Fixed: ' + this.webSrc);
          console.log('Normalize path: ', this.webSrc);

          console.log('videoUrl Original: ', videoUrl);
          console.log('dirpath Final: ', dirpath);
          console.log('filename: ', filename);

          try {

            let dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            console.log('dirUrl: ', dirUrl);

            //  let file =  await this.file.readAsArrayBuffer(dirpath, filename).then((result) => {
            let file = await this.file.readAsDataURL(dirpath, filename).then((result) => {
              let blob = new Blob([result], { type: "video/mp4" });
              this.video = {
                name: filename,
                blob: blob
              };
              console.log('Blob gerado: ', blob);
            });
            this.util.loading.dismissAll();
            this.atualizaArquivo(file);


          } catch (err) {
            console.log('error 1');

          }


        }// final if
      }, // final then
        (err) => {
          console.log(err);
        });
  }
  ///gravar da camera câmera
  onRecordVideoFTP() { //grava da camera
    console.log('Função OnRecordVideo');
    
    this.fonteCapture = 'camera';
    this.videoGallery = false;
    let options: CaptureVideoOptions = { limit: 1, duration: 1800, quality: 0 }
    this.mediaCapture.captureVideo(options)
      .then(async (data: MediaFile[]) => {
        if (data) {
          this.isSelecionado = true;
          let videoUrl = data[0].fullPath;
          console.log('videoUrl initial: ', videoUrl);

          this.webSrc = videoUrl;
          // this.showLoader();
          this.uploadedVideo = null;

          let dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
          let filename = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);

          this.webSrc = dirpath + filename;
          console.log('Caminho do video webSrc: ', this.webSrc);


          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;

          console.log('Fixed: ' + this.webSrc);
          console.log('Normalize path: ', this.webSrc);

          console.log('videoUrl: ', videoUrl);
          console.log('dirpath Final: ', dirpath);
          console.log('filename: ', filename);
          this.fileUpload = videoUrl;
        }// final if
      }, // final then
        (err) => {
          console.log(err);
        });
  }

  deleteArqui() {
    // const images = firebase.storage().ref().child('pasta');
    // const image = images.child('1553352893853.mp4');
    // image.delete().then((url) => {
    //   console.log(url);
    // });
    /* image.getDownloadURL().then((url) => {
         console.log(url);
    }); */
  }
  closeModal() {
    this.navCtrl.pop();
    this.events.publish('updateScreen');
    //this.navCtrl.push('VideoCodePage',{videos:this.videos,token:this.token,code:this.id_code,package_videos:this.package_videos,package_name:this.package_name});

  }
  uploadPause() {
    // Pause the upload
    this.uploadTask.pause();
    this.ispause = "";
    this.isResume = "true";
    this.isCancel = "true";

  }
  uploadResume() {
    this.uploadTask.resume();
    this.ispause = "true";
    this.isCancel = "true";
    this.isResume = "";
  }

  uploadCancel() {
    this.uploadTask.cancel();
    this.arquivo = "";
    this.ispause = "";
    this.isCancel = "";
    this.isResume = "";
    this.selecionado = "asd";
    this.porcentagem = "";
    this.name = "";
  }

  atualizaArquivo(event) {
    if (this.videos.length > 0) {
      console.log("entrei aqui no >0", this.videos.length);
      if (this.videos.length >= this.package_videos) {
        const alert = this.alertCtrl.create({
          title: this.aviso,
          subTitle: this.msg_video + '<br>' + this.pacote + ' :' + this.package_name + '<br>' + this.videos + ' CODE: ' + this.package_videos,
          buttons: ['OK']
        });
        alert.present();
      } else {
        console.log("entrei aqui no ==");
        console.log("Event Completo:", event);

        console.log('Fonte capture: ', this.fonteCapture);
        if (this.fonteCapture == 'camera') {
          event = null;
          console.log('gravei da camera');
          this.arquivo = this.video.blob;
          this.arquivo.name = this.video.name;
          this.name = this.video.name;
        }
        if (this.fonteCapture == 'galeria') {
          console.log('Selecionei da Galeria');
          this.fonteCapture = 'galeria';
          this.arquivo = event.srcElement.files[0];
          this.name = this.arquivo.name;
        }
        console.log('else 1 atualizaArquivo this.arquivo completo', this.arquivo);
        this.isEnviando = true;
        console.log(this.name);
        this.isCancel = "";
        this.isResume = "";
        this.ispause = "";
        console.log(event);
      }
    } else {
      console.log("entrei aqui no else");
      this.arquivo = event.srcElement.files[0];
      console.log('else 2 atualizaArquivo', this.arquivo);
      this.isEnviando = true;
      this.name = this.arquivo.name;
      console.log(this.name);
      this.isCancel = "";
      this.isResume = "";
      this.ispause = "";
      console.log(event);
    }

  }
  getUploadVideo(video) {
    console.log(video);
    this.isEnviando = false;
    console.log('processo de envio');
    //this.getVideo(video);

    // const images = firebase.storage().ref().child('pasta');
    let vi = this.name;
    // const image = images.child(vi.toString());
    // image.getDownloadURL().then((url) => {
    // let old = function (){
    //   // console.log(url);
    //   this.util.showLoading(this.load_enviando);

      // console.log(url);
      // this.codeProvider.video_link_create(this.id_code, this.token, url, "firebase", this.lang)
    //     .then(
    //       (result: any) => {
    //         this.util.loading.dismissAll();
    //         if (result.status == 200) {
    //           console.log("result delete code", result);
    //           this.selecionado = "true";
    //           this.name = "";
    //           this.porcentagem = "";
    //           //this.closeModal();

    //           //this.navCtrl.push('VideoCodePage',{videos:result.midias,token:this.token,code:this.id_code,package_videos:this.package_videos,package_name:this.package_name});

    //           this.toast.create({ message: result.message, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' }).present();
    //           this.case_upload();
    //         } else if (result.status == 402) {
    //           this.toast.create({ message: result.message, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'alerta' }).present();
    //           this.navCtrl.push('LoginPage', { lang: this.lang });
    //         }
    //         else if (result.status == 403) {
    //           this.selecionado = "true";
    //           this.name = "";
    //           this.porcentagem = "";
    //           this.toast.create({ message: result.message, position: 'botton', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' }).present();
    //         }
    //       }, (error: any) => {
    //         //this.toast.create({ message: 'Não conseguimos conectar ao servidor !', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
    //         this.util.loading.dismissAll();
    //         //this.navCtrl.setRoot('HomePage');
    //         this.tentar_video();

    //       });

    // }).catch(() => {
    //   //this.selecionado="true";
    //   //this.name = "";
    //   //.toast.create({ message: "Não conseguimos completar o envio do seu vídeo", position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
    //   // this.tentar_video();
    //   this.getUploadVideo(this.name);
    // });


  }

  tentar_video() {
    const prompt = this.alertCtrl.create({
      title: 'Aviso',
      message: "Não conseguimos completar o envio do seu vídeo",
      /*   inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ], */
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
            this.selecionado = "true";
            this.name = "";
            this.porcentagem = "";
          }
        },
        {
          text: 'Tentar novamente',
          handler: data => {
            console.log('Saved clicked');
            this.getUploadVideo(this.name);
          }
        }
      ]
    });
    prompt.present();
  }
  case_upload() {
    const prompt = this.alertCtrl.create({
      title: this.enviado_video,
      message: this.outro_video,
      /*   inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
        ], */
      buttons: [
        {
          text: this.nao,
          handler: data => {
            /* console.log('Cancel clicked');
            this.selecionado="true";
            this.name = "";
            this.porcentagem=""; */
            this.viewCtrl.dismiss();
          }
        },
        {
          text: this.sim,
          handler: data => {
            //console.log('Saved clicked');
            //this.getUploadVideo(this.name);
          }
        }
      ]
    });
    prompt.present();
  }
  getSizeAq() {
    this.file.resolveLocalFilesystemUrl(this.fullPath).then((res: Entry) => {
      res.getMetadata((metadata) => {
        this.total = metadata.size;
        console.log("size", metadata.size);
      });
    })
  }

  getVideo(video) {
    // const images = firebase.storage().ref().child('pasta');
    // const image = images.child("VID-20190329-WA0030.mp4");
    // image.getDownloadURL().then((url) => {
    //   console.log(url);
    // });
  }
  someFunction() {
    let event = new KeyboardEvent('keyup', { 'bubbles': true });
    // this.userInput.nativeElement.dispatchEvent(event);

  }

  onKeyup(event) {
    console.log(event)
  }

  onKeydown(event) {
    console.log(event)
  }
  //metodo via ftp
  async getAccess() {
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes';

    let getData = {
      id: this.id_code,
      bloco: 14,
      token: this.token,
      action: 'access',
    };

    let accessData = await this.http.post(url, getData, {})
      .then(data => {
        let resp = {
          data: JSON.parse(data.data),
          status: data.status
        };
        return resp;
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        // console.log(error.headers);

      });

    return accessData;
  }
  ///metodo de envio via FTP
  async sendVideoFTP() {
    this.inUpload = true;
    this.isSelecionado = false;
    this.alertSuccess = false;
    await this.getAccess()
      .then(async (res: any) => {
        console.log('Retorno do getAccess: ', res);

        let data = res.data;
        this.ftp_host = data.dominion;
        let ftp_path = data.file_path;
        this.ftp_user = data.user;
        this.ftp_password = data.password;
        this.ftp_remote_path = ftp_path + this.id_code + '/';

        await this.createNewFileName(this.fileUpload).then((name) => {
          console.log('Nome gerado: ', name);
          this.FTPnewName = name;

        });

      });


    await this.fTP.connect('108.161.131.35', this.ftp_user, this.ftp_password)
      .then((res: any) => {
        this.inProgress = true;

        console.log('Conectado: ', res);
      })
      .catch((error: any) => console.error(error)), (err) => {
        console.log('Erro na conexao: ', err);
      };

    console.log('Verificando este folder: ', this.ftp_remote_path);

    let checkFolderFunc = await this.checkFolderRemote().then((checkFolder) => {
      console.log('Verificando folder: ', checkFolder);

    });
    await console.log('Verificando folder fora : ', checkFolderFunc);

    ///upload FTP
    console.log('estou no meio');
    await this.fTP.upload(this.fileUpload, this.ftp_remote_path + this.FTPnewName).subscribe((progress) => {
      // console.log(progress);
      if (progress == 1) {
        console.log('progress 1::');
      }

      this._zone.run(() => {
        var perc = Math.round(progress * 100);
        // console.log(progressEvent,'%',perc);
        this.uploadPercent = perc;
        if (perc == 100 && this.alertSuccess == false) {
          this.alertSuccess = true;
          console.log('perc  100::');
          this.video_create_ftp(this.FTPnewName);

          this.inUpload = false;

        }
      });

    }), (err) => {
      console.log('Erro no upload: ', err);
    };
    console.log('estou no final');

  }

  uploadCancelFTP() {
    this.fTP.cancel().then((res) => {
      this.fileUpload = null;
      this.inUpload = false;
      this.isSelecionado = false;
      this.inProgress = false;
      this.inUpload = false;
      this.porcentagem = 0;

    }), (err) => console.log('erro ao camcelar: ', err);
  }

  async checkFolderRemote() {
    let checkFolder = await this.fTP.ls(this.ftp_remote_path)
      .then(() => {
        return 'Folder existe';
      }).catch(() => {
        this.fTP.mkdir(this.ftp_remote_path).then(() => {
          return 'Folder criado.';
        });
      });

    return checkFolder;
  }

  video_create_ftp(files: String) {
    this.util.showLoading('Aguarde...');
    var data = {
      id: this.id_code,
      bloco: 8,
      token: this.token,
      files: files
    }
    console.log('dados enviados em video_create_ftp: ', data);
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes';
    this.http.post(url, data, {})
      .then(data => {
        this.util.loading.dismissAll();
        this.viewCtrl.dismiss();
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  //criar novo nome de arquivo
  async createNewFileName(oldFileName: string) {
    let extension: string = await oldFileName.substr(oldFileName.lastIndexOf('.')); // .png, .jpg
    return new Date().getTime() + extension.toLocaleLowerCase(); // 1264546456.jpg
  }

  playVideo() {
    // let videoUrl = './storage/4144-1118/DCIM/Camera/VID_20191124_194851.mp4';
    // let video = this.myVideo.nativeElement;
    // video.src = videoUrl;
    // video.src = this.webSrc;

    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait',
      shouldAutoClose: true,
      controls: true,
    };

    this.streamingMedia.playVideo(this.webSrc, options);

  }

}
