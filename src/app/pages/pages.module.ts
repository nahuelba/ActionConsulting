import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexModule } from './index/index.module';
import { EmpresaModule } from './empresa/empresa.module';
import { PersonalModule } from './personal/personal.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    EmpresaModule,
    PersonalModule,
    AuthModule
  ]
})
export class PagesModule { }
