
export interface job {
    tipo_trabajo: string,
    descripcion:string,
    fecha_publicacion:any,
    id?:string,
    puesto:string,
    pais:pais,
    estado:string,
    empresa_id:string,
    postulaciones?:any,
    destacado:boolean,
    rubro:string,
    prioridad_trabajo:string
}

export interface pais {
    pais: string,
    provincia: provincia
}

export interface provincia {
    provincia: string,
    ciudad: ciudad
}

export interface ciudad {
    ciudad: string
}