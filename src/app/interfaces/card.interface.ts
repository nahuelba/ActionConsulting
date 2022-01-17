
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
    categoria:string,
    rubro:string
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