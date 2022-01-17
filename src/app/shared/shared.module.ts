import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajoNuevoComponent } from './pages/trabajo-nuevo/trabajo-nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxSpinnerModule } from 'ngx-bootstrap-spinner';
import { FooterComponent } from './footer/footer.component';
import { CargarCVComponent } from './pages/cargar-cv/cargar-cv.component';
import { TipoCuentaComponent } from './tipo-cuenta/tipo-cuenta.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TrabajoNuevoComponent,
    FooterComponent,
    CargarCVComponent,
    TipoCuentaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
    ],
  exports:[
    TrabajoNuevoComponent,
    FooterComponent,
    CargarCVComponent,
    
  ]
})
export class SharedModule { }
