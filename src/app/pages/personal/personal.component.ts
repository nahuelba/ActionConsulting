import { DatePipe, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { job } from 'src/app/interfaces/card.interface';
import { Filters } from 'src/app/interfaces/filters.interface';
import { FilterDatePipe } from 'src/app/pipes/personal/filtros/filter-date.pipe';
import { FilterPipe } from 'src/app/pipes/personal/filtros/filter.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { FiltrosService } from 'src/app/services/filtros.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers: [DatePipe, FilterPipe, FilterDatePipe],
})
export class PersonalComponent implements OnInit {
  filters: Filters = {
    provincia: '',
    date: '',
    puesto: '',
    pais: '',
    ciudad: '',
    busqueda: '',
    rubro: '',
  };

  jobs!: job[];

  today = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  provincias: any[] = [];
  tipoPuestos: any[] = [];
  paises: any[] = [];
  ciudades: any[] = [];

  loader = true;

  jobsCarrousel!: job[];

  constructor(
    private CardService: CardService,
    public FiltrosService: FiltrosService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private titleService: Title,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Personal | ACTION HUMAN CAPITAL CONSULTING');

    this.getJobs();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getJobs() {
    this.CardService.getCardsPublicadas().subscribe(
      (data) => {
        //a.sort(function(a,b){return a.xx-b.xx});
        data.sort(function (x, y) {
          // true values first
          return x.destacado === y.destacado ? 0 : x ? -1 : 1;
          // false values first
          // return (x === y)? 0 : x? 1 : -1;
        });

        this.jobs = data;
        console.log(this.jobs);

        this.loader = false;

        //extraer paises
        let arrayPaises: any = [];
        this.jobs.forEach((e) => arrayPaises.push(e.pais));
        this.paises = this.CardService.removeDuplicates(arrayPaises);

        this.FiltrosService.extraer(this.jobs);

         //Verificar perfil, si el usuario tiene rubro especificado, poner como default el rubro
        
        this.AuthService.getUserAfsSinId().subscribe((user: any) => {
          var TrabajosConEseRubro = this.jobs.filter(job => job.rubro==user.rubro)          
          if(TrabajosConEseRubro.length>0){
            this.filtro('rubro', user.rubro);
          }

        });

      },
      (err) => console.log(err)
    );
  }

  filtro(filtro: string, texto: string) {
    switch (filtro) {
      case 'pais':
        this.filters.provincia = '';
        this.filters.ciudad = '';
        this.filters.pais = texto;
        break;

      case 'provincia':
        this.filters.ciudad = '';
        this.filters.provincia = texto;
        break;

      case 'ciudad':
        this.filters.ciudad = texto;
        break;

      case 'puesto':
        this.filters.puesto = texto;
        break;

      case 'rubro':
        this.filters.rubro = texto;
        break;

      case 'fecha':
        this.filters.date = texto;
    }
  }

  limpiarFiltros() {
    this.filters = {
      provincia: '',
      date: '',
      puesto: '',
      pais: '',
      ciudad: '',
      busqueda: '',
      rubro: '',
    };

    this.FiltrosService.extraer(this.jobs);
  }
}
