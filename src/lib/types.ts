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
