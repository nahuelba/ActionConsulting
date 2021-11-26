import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() langs:any;

  @Output () lang: EventEmitter<string> = new EventEmitter();

  langSelect:string = ""

  constructor() { }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
  
    this.lang.emit(lang);
  }

}
