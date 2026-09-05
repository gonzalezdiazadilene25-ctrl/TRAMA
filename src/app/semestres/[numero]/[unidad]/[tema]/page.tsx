import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProgresoSelector from "@/components/ProgresoSelector";
import ApuntesEditor from "@/components/ApuntesEditor";
import ResumenIA from "@/components/ResumenIA";
import EvaluacionIA from "@/components/EvaluacionIA";
import RegistrarVisita from "@/components/RegistrarVisita";
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
      <RegistrarVisita
        href={`${base}/${tema.slug}`}
        titulo={tema.titulo}
        unidad={`${unidad.nombre} · ${semestre.numero}.º semestre`}
      />
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Semestres", href: "/semestres" },
          { label: `${semestre.numero}.º semestre`, href: `/semestres/${semestre.numero}` },
          { label: unidad.nombre, href: base },
          { label: tema.titulo },
        ]}
      />

      <div className="mb-5 rounded-3xl bg-[var(--acento)] p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">{tema.titulo}</h1>
        {tema.nombreCientifico && <p className="italic text-white/80">{tema.nombreCientifico}</p>}
      </div>

      <ProgresoSelector semestre={semestre.numero} unidad={unidadSlug} tema={tema.slug} />

      <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Definición
        </h2>
        <p className="text-trama-texto">{tema.definicion}</p>
      </section>

      {tema.composicion && (
        <section className="mb-5 overflow-hidden rounded-2xl border border-trama-borde bg-trama-superficie shadow-sm">
          <h2 className="px-5 pt-5 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Composición
          </h2>
          <div className="mt-3">
            {tema.composicion.map((c, i) => (
              <div
                key={c.componente}
                className={`flex justify-between px-5 py-2.5 text-sm ${
                  i > 0 ? "border-t border-trama-borde" : ""
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
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Composición
          </h2>
          <p className="text-trama-texto">{tema.composicionNota}</p>
        </section>
      )}

      {tema.fichaTecnica && (
        <section className="mb-5 overflow-hidden rounded-2xl border border-trama-borde bg-trama-superficie shadow-sm">
          <h2 className="px-5 pt-5 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Ficha técnica
          </h2>
          <div className="mt-3">
            {tema.fichaTecnica.map((f, i) => (
              <div
                key={f.propiedad}
                className={`flex justify-between px-5 py-2.5 text-sm ${
                  i > 0 ? "border-t border-trama-borde" : ""
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
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Ficha técnica
          </h2>
          <p className="text-sm text-trama-grana">
            Pendiente de verificar con norma o bibliografía. Agrega los valores en tus apuntes
            cuando los confirmes en clase.
          </p>
        </section>
      )}

      {tema.caracteristicas && (
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Características
          </h2>
          <ul className="list-inside list-disc space-y-1 text-trama-texto">
            {tema.caracteristicas.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {tema.fuentePendiente && (
        <p className="mb-5 text-xs text-trama-gris">
          Fuente bibliográfica exacta pendiente de registrar.
        </p>
      )}

      <ApuntesEditor semestre={semestre.numero} unidad={unidadSlug} tema={tema.slug} />

      <ResumenIA semestre={semestre.numero} unidad={unidadSlug} tema={tema} />

      <EvaluacionIA semestre={semestre.numero} unidad={unidadSlug} tema={tema} />

      <div className="flex justify-between border-t border-trama-borde pt-4 text-sm">
        {anterior ? (
          <Link href={`${base}/${anterior.slug}`} className="text-[var(--acento)] hover:underline">
            ‹ {anterior.titulo}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link href={`${base}/${siguiente.slug}`} className="text-[var(--acento)] hover:underline">
            {siguiente.titulo} ›
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
