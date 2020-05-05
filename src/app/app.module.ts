
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule, } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
// import { AngularFireModule } from "angularfire2";
// import { FIREBASE_CONFIG } from './firebase.config';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Autosize } from '../directives/autosize/autosize';
import { FileUploadModule } from 'ng2-file-upload';

// Native plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Chooser } from '@ionic-native/chooser';
import { CallNumber } from '@ionic-native/call-number';
import { SQLite } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HTTP } from '@ionic-native/http';
import { FTP } from '@ionic-native/ftp';
import { Media } from '@ionic-native/media';
import { NativeAudio } from '@ionic-native/native-audio';
import { Crop } from '@ionic-native/crop';
import { VideoEditor } from '@ionic-native/video-editor';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Facebook } from '@ionic-native/facebook';
import { Clipboard } from '@ionic-native/clipboard';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media';


//import provider
import { SqliteHelperService } from '../providers/sqlite-helper/sqlite-helper.service';
import { CodeProvider } from '../providers/code/code';
import { NetworkProvider } from '../providers/network/network';
import { UsuarioService } from '../providers/movie/usuario.service';
import { AdminToolsDb, AdminToolsRest } from '../providers/admin-tools/admin-tools';
import { UtilService } from '../providers/util/util.service';
import { GeolocationProvider } from '../providers/geolocation/geolocation';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { QRScanner } from '@ionic-native/qr-scanner';
import { TranslateConfigService } from '../providers/lang-translate-config/translate-config.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    Autosize,
    ProgressBarComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FileUploadModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp,{ scrollAssist: false }),
    // AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   ],
  providers: [
    InAppBrowser,
    Keyboard,
    QRScanner,
    WebView,
    Clipboard,
    Facebook,
    AdminToolsDb,
    AdminToolsRest,
    LocationAccuracy,
    VideoEditor,
    StreamingMedia,
    Chooser,
    Crop,
    CallNumber,
    NativeAudio,
    Media,
    HTTP,
    FTP,
    MediaCapture,
    Camera,
    SQLite,
    NativeStorage,
    SqliteHelperService,
    CodeProvider,
    Geolocation,
    Deeplinks,
    Base64,
    SocialSharing,
    BrowserTab,
    File,
    Network,
    NetworkProvider,
    StatusBar,
    SplashScreen,
    UsuarioService,
    UtilService,
    Diagnostic,
    GeolocationProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TranslateConfigService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
