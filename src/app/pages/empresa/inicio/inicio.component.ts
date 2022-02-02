import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Empresa | ACTION HUMAN CAPITAL CONSULTING');
  }

}
