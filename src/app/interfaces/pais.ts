
export interface pais {
  pais: string;
  provincias: Provincia[];
}

export interface Provincia {
  provincia: string;
  ciudades: string[];
}