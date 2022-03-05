
export interface job {
    titulo:string,
    tipo_trabajo: string,
    descripcion:string,
    fecha_publicacion:any,
    id?:string,
    puesto:string,
    pais:string,
    provincia:string,
    ciudad:string,
    estado:string,
    empresa_id:string,
    postulaciones?:any,
    destacado:boolean,
    rubro:string,
    prioridad_trabajo:string,
    dias_restantes?:number,
    empresa?:string;
}
