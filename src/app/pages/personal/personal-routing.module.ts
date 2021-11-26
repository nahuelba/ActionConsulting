import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPageComponent } from './job-page/job-page.component';
import { LoginComponent } from './login/login.component';
import { PersonalComponent } from './personal.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component:PersonalComponent,

  },
 {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'job/:id',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
