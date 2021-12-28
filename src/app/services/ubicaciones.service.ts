import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor(private http:HttpClient) { }


  getProvincias(pais:string){
    if(pais=="Canadá"){
      pais = "Canada"
    }else if(pais=="Costa Rica"){
      pais= "Costa-rica"
    }else if(pais=="Emiratos Árabes Unidos"){
      pais="Emiratos-arabes"
    }else if(pais=="España"){
      pais="Espana"
    }else if(pais=="Estados Unidos"){
      pais="United-states"
    }else if(pais=="México"){
      pais="Mexico"
    }else if(pais=="Panamá"){
      pais="Panama"
    }else if(pais=="Perú"){
      pais="Peru"
    }else if(pais=="Reino Unido"){
      pais="Reino-unido"
    }
    return this.http.get<pais>(`../../assets/Opciones/Paises/${pais}.json`);
  }
}
