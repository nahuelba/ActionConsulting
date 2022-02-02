export interface experiencia_laboral {
    puesto: string;
    rubro: string;
    empresa: string;
    pais: string;
    provincia: string;
    ciudad: string;
    fecha_inicio: Fechainicio;
    fecha_fin?: Fechafin;
    principales_responsabilidades: string;
    id?:string;
    actualidad:boolean;
}

interface Fechainicio {
  mes: string;
  year: string;
}
interface Fechafin {
    mes: string;
    year: string;
  }