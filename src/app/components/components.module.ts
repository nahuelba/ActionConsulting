import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { JobcardSkeletonComponent } from './jobcard-skeleton/jobcard-skeleton.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarEmpresaComponent } from './navbar-empresa/navbar-empresa.component';
import { TrabajoCardEmpresaComponent } from './trabajo-card-empresa/trabajo-card-empresa.component';
import { TrabajoDetalleCardComponent } from './trabajo-detalle-card/trabajo-detalle-card.component';





@NgModule({
  declarations: [
    JobcardSkeletonComponent,
    NavbarComponent,
    NavbarEmpresaComponent,
    TrabajoCardEmpresaComponent,
    TrabajoDetalleCardComponent,

  ],
  exports:[
    JobcardSkeletonComponent,
    NavbarComponent,
    NavbarEmpresaComponent,
    TrabajoCardEmpresaComponent,
    TrabajoDetalleCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
