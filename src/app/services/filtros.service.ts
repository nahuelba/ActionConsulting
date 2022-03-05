import { Injectable } from '@angular/core';
import { CardService } from './card.service';
import { job } from '../interfaces/card.interface';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  puestos:any = []
  provincias:any = []
  paises: any = []
  fechas:any = []
  ciudades:any = []
  rubro:any = []

  cantidad_trabajos:number = 0

  constructor(private CardService:CardService) { }

  extraer(jobs:job[]){
  
    //extraer pais
    let ArrayPais:any = []
    jobs.forEach((job:job) => ArrayPais.push(job.pais))
    this.paises = this.CardService.removeDuplicates(ArrayPais)
  
    //Extraer fechas
    let arrayFechas:any = []

  

  
            
    //Hoy
    var today = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    var yesterday = formatDate(new Date(Date.now() - 86400000), 'dd/MM/yyyy', 'en')  

    jobs.forEach((e:job) => {
      //hoy
      if(formatDate(e.fecha_publicacion.toDate(), 'dd/MM/yyyy', 'en')==today){
        arrayFechas.push('Hoy')
        return;
      }
      //ayer
      if(formatDate(e.fecha_publicacion.toDate(), 'dd/MM/yyyy', 'en')==yesterday){
        arrayFechas.push('Ayer')
        return;
      }

      //restos de fechas
      let now = new Date(); //calculamos fecha de hoy
      let ts = new Date(e.fecha_publicacion.seconds * 1000); //calculamos la fecha de la publicacion
      let diff = now.getTime() - ts.getTime(); //sacamos la diferencia de las fechas en milisegundos

      //Menor a 3 días
      if( diff < 259200000){
        arrayFechas.push('Menor a 3 días')
        return;
      }

      //Menor a 4 días
      if( diff < 345600000){
        arrayFechas.push('Menor a 4 días')
        return;
      }

      //Menor a 5 días
      if( diff < 432000000){
        arrayFechas.push('Menor a 5 días')
        return;
      }

      //Menor a 6 días
      if( diff < 518400000){
        arrayFechas.push('Menor a 6 días')
        return;
      }

      //Menor a 3 días
      if( diff < 604800000){
        arrayFechas.push('Menor a 1 semana')
        return;
      }

      //Menor a 15 días
      if( diff < 1296000000){
        arrayFechas.push('Menor a 15 días')
        return;
      }

       //Menor a 1 mes
       if( diff < 2592000000){
        arrayFechas.push('Menor a 1 mes')
        return;
      }
    })
  
    this.fechas = this.CardService.removeDuplicates(arrayFechas)
  

  
      //extraer puesto
      let ArrayPuesto:any = []
      jobs.forEach((job:job) => ArrayPuesto.push(job.puesto))
      this.puestos = this.CardService.removeDuplicates(ArrayPuesto)

      //extraer Rubro
      let ArrayRubro:any = []
      jobs.forEach((job:job) => ArrayRubro.push(job.rubro))
      this.rubro = this.CardService.removeDuplicates(ArrayRubro)

    //   Extraer provincias
    let arrayProvincias:string[] = []
    jobs.forEach((e:job) => {
      if(e.pais){
        arrayProvincias.push(e.provincia) 
      }
    })
    this.provincias = this.CardService.removeDuplicates(arrayProvincias)

      //   Extraer Ciudades
      let arrayCiudades:string[] = []
      jobs.forEach((e:job) => {
        if(e.provincia){
          arrayCiudades.push(e.ciudad) 
        }
      })
      this.ciudades = this.CardService.removeDuplicates(arrayCiudades)
    
  
       
      this.contar_trabajos(jobs)

    

     
  }


  contar_trabajos(jobs:job[]){
    this.cantidad_trabajos = jobs.length
  }


  getAge(date:any) {
    var today = new Date();
    var birthDate = new Date(date.year, date.month-1, date.day);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  getFechaLimite(edad:number){
    var today = new Date();
    return today.getFullYear() - edad

  }
}
