import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


import { PersonalRoutingModule } from './personal-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { JobPageComponent } from './job-page/job-page.component';
import { SearchComponent } from './search/search.component';
import { PersonalComponent } from './personal.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';



@NgModule({
  declarations: [
    PersonalComponent,
    JobPageComponent,
    SearchComponent,
    PostulacionesComponent

  ],
  imports: [
    RouterModule,
    CommonModule,
    PersonalRoutingModule,
    ComponentsModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    PipesModule
  ]
})
export class PersonalModule { }
