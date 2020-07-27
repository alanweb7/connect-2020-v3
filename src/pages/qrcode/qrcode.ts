import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { CodeProvider } from '../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  public codeScan: any;
  public responseQR: any;
  public responseApi: any = {};
  public messageStyle;
  public currentCanal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    private qrScanner: QRScanner,
    private zone: NgZone,
    private navparams: NavParams,
    private codeProvider: CodeProvider,
    private util: UtilService

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');

    this.qrscanner();

    let myId = this.navParams.get('id');

    console.log('Meu id recebido: ', myId);
  }

  ionViewWillEnter() {
    this.showCamera();
  }
 
  ionViewWillLeave() {
    console.log('Saindo da página ionViewWillLeave');
    this.hideCamera();

  }

  ionViewDidLeave() {
    console.log('Saindo da página ionViewDidLeave');
  }


  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  qrscanner() {
    this.currentCanal = null;

    // Optionally request the permission early
    window.document.body.style.backgroundColor = 'transparent';

    let moldScan = (window.document.getElementById('scan_content') as HTMLElement);
    moldScan.classList.add('scan_initial');
    moldScan.classList.remove('scan_success');

    this.qrScanner.prepare()
      .then(async (status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('authorized');

          // start scanning
          let scanSub = await this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.currentCanal = text;

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            window.document.body.style.backgroundColor = 'initial';

            let moldScan = (window.document.getElementById('scan_content') as HTMLElement);
            moldScan.classList.add('scan_success');
            moldScan.classList.remove('scan_initial');

            let qrContainer = (window.document.getElementById('qr-container') as HTMLElement);
            qrContainer.classList.add('qr_success');
            qrContainer.classList.remove('scan_initial');

            this.getBaseName(text).then((data) => {

              console.log('Code escaneado na funcao qrcode.page: ', data);

              if (data.status == 200) {

                this.zone.run(async () => {
                  // await this.navCtrl.push('RedirectPage', { code: sendData });
                  // await this.router.navigate(['/detalhe-code']);
                  // await this.navCtrl.push('DetalheCodePage', { code: data.code });
                  console.log('redirecionando para a Home...');
                  
                  this.navCtrl.setRoot('HomePage', { origin: 'qrcode', code: data.code });
                });

                // let dataSeacrh = {
                //   url: 'https://kscode.com.br/ksc_2020/wp-json/code/search/?code_number=' + data.code
                // };

                // this.codeProvider.getShowCode(dataSeacrh).then((res) => {

                //   console.log('dados do code escaneado em qrcode.page: ', res);

                //   if (res.status !== 200) {

                //     this.messageStyle = {
                //       'color': 'red'
                //     };
                //     this.responseApi = res;

                //   }

                //   if (res.status == 200) {
                //     this.responseQR = res;
                //     this.zone.run(async () => {
                //       // await this.navCtrl.push('RedirectPage', { code: sendData });
                //       // await this.router.navigate(['/detalhe-code']);
                //       await this.navCtrl.push('DetalheCodePage', {code: ''});
                //     });
                //   }


                // });

              }

            });






            // alert('O código não corresponde a nenhum canal Connect. \n\n Código do QR: '+ JSON.stringify(data));

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            return text;
          });
          // show camera preview

          window.document.querySelector('ion-app').classList.add('transparentBody');
          this.qrScanner.show();

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
            .then((data: QRScannerStatus) => {
              console.log('funcao this.qrScanner:: ', data.showing);
            }, err => {
              alert(err);

            });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('bloqueado');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }


  async getBaseName(url = null) {
    if (!url) {
      url = "/vitoria"
    };
    if (!url.includes('/')) { //se não contem o termo
      return url;
    }

    let parametrosDaUrl = url.split("/"); // id=10&name=gustavo
    let code = parametrosDaUrl[parametrosDaUrl.length - 1];
    let response = {
      status: 200,
      code: code
    }

    return response;
  }
}
