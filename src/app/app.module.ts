import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    PagesModule,
    ComponentsModule,
    PipesModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
