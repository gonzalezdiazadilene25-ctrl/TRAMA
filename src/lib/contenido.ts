import fibrasNaturales from "@/data/contenido/fibras-naturales.json";
import fibrasQuimicas from "@/data/contenido/fibras-quimicas.json";
import tejidosCaladaJacquard from "@/data/contenido/fundamentos-de-tejidos-de-calada-y-jacquard.json";
import tejidosPunto from "@/data/contenido/fundamentos-de-tejidos-de-punto.json";
import metodosAcabados from "@/data/contenido/metodos-de-acabados.json";
import type { UnidadContenido } from "@/lib/types";

const contenidoPorUnidad: Record<string, UnidadContenido> = {
  "fibras-naturales": fibrasNaturales as UnidadContenido,
  "fibras-quimicas": fibrasQuimicas as UnidadContenido,
  "fundamentos-de-tejidos-de-calada-y-jacquard": tejidosCaladaJacquard as UnidadContenido,
  "fundamentos-de-tejidos-de-punto": tejidosPunto as UnidadContenido,
  "metodos-de-acabados": metodosAcabados as UnidadContenido,
};

export function getContenidoUnidad(slugUnidad: string): UnidadContenido | undefined {
  return contenidoPorUnidad[slugUnidad];
}

export function getTema(slugUnidad: string, slugTema: string) {
  return getContenidoUnidad(slugUnidad)?.temas.find((t) => t.slug === slugTema);
}
