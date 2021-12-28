import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { JobPageComponent } from './job-page/job-page.component';
import { PersonalComponent } from './personal.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component:PersonalComponent
      },
      {
        path:':id',
        component: JobPageComponent,
      },
      {
        path:'search/:puesto/:lugar',
        component: SearchComponent
      },
      {
        path: 'postulaciones',
        component: PostulacionesComponent
      }
    ]
  },
  // {
  //   path:'auth',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  // }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
