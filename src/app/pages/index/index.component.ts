import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  langs:string[] = []

  constructor(private translate: TranslateService, 
    private titleService: Title) {
    translate.setDefaultLang('es');
    
    if (translate.getBrowserLang()=="es"){
      translate.use('es')
      translate.addLangs(['es', 'en']);
      
    }else{
      translate.use('en')
      translate.addLangs(['en', 'es']);
    }
    
    this.langs = translate.getLangs()
  }

  ngOnInit(): void {
    this.titleService.setTitle('ACTION HUMAN CAPITAL CONSULTING');
  }

  changeLang(lang: string){
    this.translate.use(lang)
    
  }

}
