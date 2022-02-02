import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxSpinnerModule } from "ngx-bootstrap-spinner";

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // <-- here
    ToastrModule.forRoot({
      positionClass:'toast-bottom-center'
    }),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    PagesModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
