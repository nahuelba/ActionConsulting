
export interface job {
    tipo_empresa: string,
    descripcion:string,
    fecha_publicacion:any,
    id?:string,
    puesto:string,
    pais:pais,
    estado:string,
    empresa_id:string
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