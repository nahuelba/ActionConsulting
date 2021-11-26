import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HeaderComponent } from './header/header.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ValoresComponent } from './valores/valores.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    IndexComponent,
    FooterComponent,
    ContactoComponent,
    HeaderComponent,
    QuienesSomosComponent,
    ServiciosComponent,
    ValoresComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]
})
export class IndexModule { }
