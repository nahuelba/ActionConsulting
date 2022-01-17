import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PersonalUserGuard } from 'src/app/guards/personal-user.guard';
import { JobPageComponent } from './job-page/job-page.component';
import { PersonalComponent } from './personal.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component:PersonalComponent,
        data:{animation:''}
      },
      {
        path: 'postulaciones',
        component: PostulacionesComponent,
        canActivate:[PersonalUserGuard],
        data:{animation:'postulaciones'}
      },
      {
        path:'mi-perfil',
        loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule),
        canActivate:[PersonalUserGuard]
      },
      {
        path:':id',
        component: JobPageComponent,
        data:{animation:':id'}
      },
      {
        path:'auth',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/shared/pages/auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
