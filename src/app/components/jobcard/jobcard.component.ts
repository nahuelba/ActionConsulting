import { Component, Input, OnInit } from '@angular/core';
import { job } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent implements OnInit {


  @Input() job!:job;
  loader =true;
  count =10;
  constructor() { }

  ngOnInit(): void {
  }

}
