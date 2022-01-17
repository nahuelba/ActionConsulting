import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


import { PersonalRoutingModule } from './personal-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { JobPageComponent } from './job-page/job-page.component';
import { PersonalComponent } from './personal.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PersonalComponent,
    JobPageComponent,
    PostulacionesComponent

  ],
  imports: [
    RouterModule,
    CommonModule,
    PersonalRoutingModule,
    ComponentsModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PersonalModule { }
