import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getSemestre } from "@/lib/data";
import { getContenidoUnidad } from "@/lib/contenido";
import { slugify } from "@/lib/slug";

export default async function TemaPage({
  params,
}: {
  params: Promise<{ numero: string; unidad: string; tema: string }>;
}) {
  const { numero, unidad: unidadSlug, tema: temaSlug } = await params;
  const semestre = getSemestre(Number(numero));
  if (!semestre) notFound();

  const unidad = semestre.unidades.find((u) => slugify(u.nombre) === unidadSlug);
  const contenido = getContenidoUnidad(unidadSlug);
  if (!unidad || !contenido) notFound();

  const index = contenido.temas.findIndex((t) => t.slug === temaSlug);
  const tema = contenido.temas[index];
  if (!tema) notFound();

  const anterior = index > 0 ? contenido.temas[index - 1] : undefined;
  const siguiente = index < contenido.temas.length - 1 ? contenido.temas[index + 1] : undefined;
  const base = `/semestres/${semestre.numero}/${unidadSlug}`;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Semestres", href: "/semestres" },
          { label: `${semestre.numero}.º semestre`, href: `/semestres/${semestre.numero}` },
          { label: unidad.nombre, href: base },
          { label: tema.titulo },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{tema.titulo}</h1>
        {tema.nombreCientifico && (
          <p className="italic text-trama-gris">{tema.nombreCientifico}</p>
        )}
      </div>

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-trama-indigo">
          Definición
        </h2>
        <p className="text-trama-texto">{tema.definicion}</p>
      </section>

      {tema.composicion && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-trama-indigo">
            Composición
          </h2>
          <div className="overflow-hidden rounded-lg border border-trama-gris/30 bg-white">
            {tema.composicion.map((c, i) => (
              <div
                key={c.componente}
                className={`flex justify-between px-4 py-2 text-sm ${
                  i > 0 ? "border-t border-trama-gris/20" : ""
                }`}
              >
                <span>{c.componente}</span>
                <span className="font-medium">{c.valor}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tema.composicionNota && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-trama-indigo">
            Composición
          </h2>
          <p className="text-trama-texto">{tema.composicionNota}</p>
        </section>
      )}

      {tema.fichaTecnica && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-trama-indigo">
            Ficha técnica
          </h2>
          <div className="overflow-hidden rounded-lg border border-trama-gris/30 bg-white">
            {tema.fichaTecnica.map((f, i) => (
              <div
                key={f.propiedad}
                className={`flex justify-between px-4 py-2 text-sm ${
                  i > 0 ? "border-t border-trama-gris/20" : ""
                }`}
              >
                <span>{f.propiedad}</span>
                <span className="font-medium">{f.valor}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tema.fichaTecnicaPendiente && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-trama-indigo">
            Ficha técnica
          </h2>
          <p className="text-sm text-trama-grana">
            Pendiente de verificar con norma o bibliografía. Agrega los valores en tus apuntes
            cuando los confirmes en clase.
          </p>
        </section>
      )}

      {tema.fuentePendiente && (
        <p className="mb-6 text-xs text-trama-gris">
          Fuente bibliográfica exacta pendiente de registrar.
        </p>
      )}

      <div className="mb-6 rounded-lg border border-dashed border-trama-gris/40 p-4 text-sm text-trama-gris">
        Mis apuntes, Resumen IA y Evaluación estarán disponibles en las siguientes fases del
        proyecto.
      </div>

      <div className="flex justify-between border-t border-trama-gris/20 pt-4 text-sm">
        {anterior ? (
          <Link href={`${base}/${anterior.slug}`} className="text-trama-indigo hover:underline">
            ‹ {anterior.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link href={`${base}/${siguiente.slug}`} className="text-trama-indigo hover:underline">
            {siguiente.titulo} ›
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
