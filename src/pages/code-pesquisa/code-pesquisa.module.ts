import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodePesquisaPage } from './code-pesquisa';
import { OneSignal } from '@ionic-native/onesignal';

@NgModule({
  declarations: [
    CodePesquisaPage,
  ],
  imports: [
    IonicPageModule.forChild(CodePesquisaPage),
  ],
  providers: [
    OneSignal
  ],
})
export class CodePesquisaPageModule {}
