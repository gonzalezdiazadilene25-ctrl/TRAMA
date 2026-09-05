import { semestres } from "@/lib/data";
import { getContenidoUnidad } from "@/lib/contenido";
import { slugify } from "@/lib/slug";

export interface TemaConRuta {
  semestre: number;
  unidadSlug: string;
  temaSlug: string;
  titulo: string;
}

export function getTodosLosTemas(): TemaConRuta[] {
  const resultado: TemaConRuta[] = [];
  for (const s of semestres) {
    for (const u of s.unidades) {
      const slug = slugify(u.nombre);
      const contenido = getContenidoUnidad(slug);
      if (!contenido) continue;
      for (const t of contenido.temas) {
        resultado.push({ semestre: s.numero, unidadSlug: slug, temaSlug: t.slug, titulo: t.titulo });
      }
    }
  }
  return resultado;
}
