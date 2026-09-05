export type TipoUnidad = "fija" | "trayectoria" | "eje";

export interface Unidad {
  nombre: string;
  tipo: TipoUnidad;
  verificar?: boolean;
}

export interface Semestre {
  numero: number;
  creditos: number;
  porcentaje: number;
  enfoque: string;
  unidades: Unidad[];
}

export interface FichaTecnicaItem {
  propiedad: string;
  valor: string;
}

export interface ComposicionItem {
  componente: string;
  valor: string;
}

export interface Tema {
  slug: string;
  titulo: string;
  nombreCientifico?: string;
  definicion: string;
  composicion?: ComposicionItem[];
  composicionNota?: string;
  fichaTecnica?: FichaTecnicaItem[];
  fichaTecnicaPendiente?: boolean;
  fuentePendiente?: boolean;
}

export interface UnidadContenido {
  unidad: string;
  temas: Tema[];
}

export interface TrayectoriaSemestre {
  numero: number;
  unidades: string[];
}

export interface Trayectoria {
  id: string;
  nombre: string;
  resumen: string;
  semestres: TrayectoriaSemestre[];
}
