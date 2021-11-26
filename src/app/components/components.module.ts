import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { JobcardComponent } from './jobcard/jobcard.component';
import { JobcardSkeletonComponent } from './jobcard-skeleton/jobcard-skeleton.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    JobcardComponent,
    JobcardSkeletonComponent,
    NavbarComponent,

  ],
  exports:[
    JobcardComponent,
    JobcardSkeletonComponent,
    NavbarComponent
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
