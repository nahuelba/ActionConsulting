import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {
    path:'',
    component:ContactoComponent,
    children:[
      {
        path:'',
        component:ContactanosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
