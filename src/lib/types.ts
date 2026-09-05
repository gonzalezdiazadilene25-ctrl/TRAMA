export type TipoUnidad = "fija" | "trayectoria" | "eje";

export type Evidencia = "oficial" | "ampliacion" | "por_confirmar";

export interface EvaluacionRubro {
  rubro: string;
  porcentaje: number | null;
}

export interface TemaOficial {
  id: string;
  numero: string;
  nombre: string;
  subtemas: string[];
  estado: "pendiente" | "en_curso" | "dominado";
  competencia?: string;
  objetivo?: string;
  horasDocente?: number;
  horasAutonomas?: number;
}

export interface Unidad {
  nombre: string;
  tipo: TipoUnidad;
  verificar?: boolean;
  id?: string;
  evidencia?: Evidencia;
  fuente?: string;
  proposito?: string;
  evaluacion?: EvaluacionRubro[];
  bibliografia?: string[];
  notas?: string;
  temasOficiales?: TemaOficial[];
  horasDocenteTotal?: number;
  horasAutonomasTotal?: number;
}

export interface Semestre {
  numero: number;
  creditos: number;
  porcentaje: number;
  enfoque: string;
  imagen?: string;
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
  caracteristicas?: string[];
  fuentePendiente?: boolean;
}

export interface UnidadContenido {
  unidad: string;
  evidencia?: Evidencia;
  temas: Tema[];
}

export interface ResumenIA {
  conceptosClave: string[];
  proceso: string;
  datosParaMemorizar: string[];
}

export interface Reactivo {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
  subtema: string;
}

export interface TrayectoriaSemestre {
  numero: number;
  unidades: string[];
}

export interface Trayectoria {
  id: string;
  nombre: string;
  resumen: string;
  imagen?: string;
  semestres: TrayectoriaSemestre[];
}

export interface PasoCadena {
  nombre: string;
  descripcion: string;
}

export interface DatoItem {
  etiqueta: string;
  valor: string;
}

export interface EtapaItem {
  rango: string;
  nombre: string;
  texto: string;
}

export interface AccionSeccion {
  texto: string;
  destino: string;
}

export type SeccionCarrera =
  | { titulo: string; tipo: "cadena"; pasos: PasoCadena[]; cierre?: string }
  | { titulo: string; tipo: "datos"; datos: DatoItem[] }
  | { titulo: string; tipo: "etapas"; etapas: EtapaItem[] }
  | { titulo: string; tipo: "aviso"; texto: string; accion?: AccionSeccion }
  | { titulo: string; tipo: "pasos"; pasos: string[] }
  | { titulo: string; tipo: "procedencia"; texto: string };

export interface IntroCarrera {
  id: string;
  titulo: string;
  subtitulo: string;
  entrada: string;
  secciones: SeccionCarrera[];
}

export interface IntroSemestre {
  id: string;
  titulo: string;
  eje: string;
  entrada: string;
  que_aprendes: string[];
  prioridad: string;
  conexion_siguiente: string | null;
}

export interface Introducciones {
  carrera: IntroCarrera;
  semestres: IntroSemestre[];
}
