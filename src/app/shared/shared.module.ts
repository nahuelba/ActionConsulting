import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajoNuevoComponent } from './pages/trabajo-nuevo/trabajo-nuevo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxSpinnerModule } from 'ngx-bootstrap-spinner';
import { FooterComponent } from './footer/footer.component';
import { CargarCVComponent } from './pages/cargar-cv/cargar-cv.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarUsuariosComponent } from './pages/buscar-usuarios/buscar-usuarios.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UsuarioDetalleComponent } from './pages/usuario-detalle/usuario-detalle.component';
import { ComponentsModule } from '../components/components.module';
import { SelectsModule } from '../components/selects/selects.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TrabajoNuevoComponent,
    FooterComponent,
    CargarCVComponent,
    BuscarUsuariosComponent,
    UsuarioDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    ComponentsModule,
    SelectsModule,
    NgSelectModule,
    ComponentsModule
    ],
  exports:[
    TrabajoNuevoComponent,
    FooterComponent,
    CargarCVComponent,
    BuscarUsuariosComponent,
    UsuarioDetalleComponent
    
  ]
})
export class SharedModule { }
