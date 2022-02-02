export interface formacion {
    pais:string;
    provincia:string;
    ciudad:string;
    tipo_estudio:string;
    titulo:string;
    area_estudio:string;
    fecha_inicio: Fechainicio;
    fecha_fin?: Fechafin;
    otros_conocimientos:string;
    id?:string;
}

interface Fechainicio {
    mes: string;
    year: string;
  }
  interface Fechafin {
      mes: string;
      year: string;
    }