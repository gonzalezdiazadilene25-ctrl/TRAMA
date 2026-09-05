const NS = "trama";

export type EstadoTema = "nuevo" | "en-curso" | "dominado";

function apunteKey(semestre: number, unidad: string, tema: string): string {
  return `${NS}:apunte:${semestre}:${unidad}:${tema}`;
}

function progresoKey(semestre: number, unidad: string, tema: string): string {
  return `${NS}:progreso:${semestre}:${unidad}:${tema}`;
}

export function getApunte(semestre: number, unidad: string, tema: string): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(apunteKey(semestre, unidad, tema)) ?? "";
}

export function setApunte(semestre: number, unidad: string, tema: string, texto: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(apunteKey(semestre, unidad, tema), texto);
}

export function getProgreso(semestre: number, unidad: string, tema: string): EstadoTema {
  if (typeof window === "undefined") return "nuevo";
  const valor = window.localStorage.getItem(progresoKey(semestre, unidad, tema));
  return valor === "en-curso" || valor === "dominado" ? valor : "nuevo";
}

export function setProgreso(
  semestre: number,
  unidad: string,
  tema: string,
  estado: EstadoTema
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(progresoKey(semestre, unidad, tema), estado);
}

export interface UltimoTema {
  href: string;
  titulo: string;
  unidad: string;
}

const ULTIMO_TEMA_KEY = `${NS}:ultimo-tema`;

export function setUltimoTema(valor: UltimoTema): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ULTIMO_TEMA_KEY, JSON.stringify(valor));
}

export function getUltimoTema(): UltimoTema | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ULTIMO_TEMA_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UltimoTema;
  } catch {
    return null;
  }
}
