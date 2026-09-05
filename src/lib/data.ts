import semestresData from "@/data/semestres.json";
import trayectoriasData from "@/data/trayectorias.json";
import type { Semestre, Trayectoria } from "@/lib/types";

export const semestres = semestresData as Semestre[];
export const trayectorias = trayectoriasData as Trayectoria[];

export function getSemestre(numero: number): Semestre | undefined {
  return semestres.find((s) => s.numero === numero);
}

export function getTrayectoria(id: string): Trayectoria | undefined {
  return trayectorias.find((t) => t.id === id);
}
