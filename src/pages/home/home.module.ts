import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { OneSignal } from '@ionic-native/onesignal';
import { Keyboard } from '@ionic-native/keyboard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClienteProvider } from '../../providers/cliente/cliente';
import {HttpClient} from "@angular/common/http";
import { HistoricoService } from '../../providers/historico/historico.service';
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers:[
    HistoricoService,
    OneSignal,
    Keyboard,
    ClienteProvider
  ],
 
})
export class HomePageModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}