import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheCodePage } from './detalhe-code';
import { HistoricoService } from '../../providers/historico/historico.service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { OneSignal } from '@ionic-native/onesignal';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from "@angular/common/http";
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    DetalheCodePage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(DetalheCodePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    HistoricoService,
    PhotoViewer,
    EmailComposer,
    OneSignal,
    CallNumber
  ]
})
export class DetalheCodePageModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
