import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TemasList from "@/components/TemasList";
import { getSemestre } from "@/lib/data";
import { getContenidoUnidad } from "@/lib/contenido";
import { slugify } from "@/lib/slug";

const evidenciaBadge: Record<string, { texto: string; clase: string }> = {
  ampliacion: { texto: "Ampliación (no es el temario oficial)", clase: "bg-[var(--acento)]/10 text-[var(--acento)]" },
  por_confirmar: { texto: "Por confirmar — falta temario oficial", clase: "bg-trama-grana/10 text-trama-grana" },
};

export default async function UnidadPage({
  params,
}: {
  params: Promise<{ numero: string; unidad: string }>;
}) {
  const { numero, unidad: unidadSlug } = await params;
  const semestre = getSemestre(Number(numero));
  if (!semestre) notFound();

  const unidad = semestre.unidades.find((u) => slugify(u.nombre) === unidadSlug);
  if (!unidad) notFound();

  const contenido = getContenidoUnidad(unidadSlug);
  const badgeUnidad = unidad.evidencia ? evidenciaBadge[unidad.evidencia] : undefined;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Semestres", href: "/semestres" },
          { label: `${semestre.numero}.º semestre`, href: `/semestres/${semestre.numero}` },
          { label: unidad.nombre },
        ]}
      />

      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold">{unidad.nombre}</h1>
        {badgeUnidad && (
          <span className={`rounded-full px-2 py-0.5 text-xs ${badgeUnidad.clase}`}>
            {badgeUnidad.texto}
          </span>
        )}
      </div>
      <p className="mb-6 text-sm text-trama-gris">{semestre.numero}.º semestre</p>

      {unidad.proposito && (
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Propósito
          </h2>
          <p className="text-trama-texto">{unidad.proposito}</p>
        </section>
      )}

      {unidad.notas && (
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 text-sm text-trama-grana shadow-sm">
          {unidad.notas}
        </section>
      )}

      {unidad.evaluacion && unidad.evaluacion.length > 0 && (
        <section className="mb-5 overflow-hidden rounded-2xl border border-trama-borde bg-trama-superficie shadow-sm">
          <h2 className="px-5 pt-5 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Evaluación
          </h2>
          <div className="mt-3">
            {unidad.evaluacion.map((e, i) => (
              <div
                key={e.rubro}
                className={`flex justify-between px-5 py-2.5 text-sm ${i > 0 ? "border-t border-trama-borde" : ""}`}
              >
                <span>{e.rubro}</span>
                <span className="font-medium">{e.porcentaje !== null ? `${e.porcentaje}%` : "por confirmar"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {unidad.temasOficiales && unidad.temasOficiales.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-lg font-semibold">Temario oficial</h2>
          <div className="flex flex-col gap-3">
            {unidad.temasOficiales.map((t) => (
              <details key={t.id} className="rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm">
                <summary className="cursor-pointer font-medium text-trama-texto">
                  {t.numero}. {t.nombre}
                </summary>
                {t.objetivo && <p className="mt-2 text-sm text-trama-gris">{t.objetivo}</p>}
                <ul className="mt-2 list-inside list-disc space-y-0.5 text-sm text-trama-texto">
                  {t.subtemas.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      )}

      {unidad.bibliografia && unidad.bibliografia.length > 0 && (
        <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
            Bibliografía
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-trama-texto">
            {unidad.bibliografia.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {contenido ? (
        <>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-lg font-semibold">Vista de estudio</h2>
            {contenido.evidencia === "ampliacion" && (
              <span className="rounded-full bg-[var(--acento)]/10 px-2 py-0.5 text-xs text-[var(--acento)]">
                Ampliación
              </span>
            )}
          </div>
          <TemasList temas={contenido.temas} semestre={semestre.numero} unidadSlug={unidadSlug} />
        </>
      ) : (
        !unidad.temasOficiales && (
          <div className="rounded-2xl border border-dashed border-trama-borde bg-trama-superficie p-5 text-trama-gris">
            El contenido de esta unidad todavía está en desarrollo. Por ahora, apóyate en tus
            apuntes de clase — esta vista se completará en una etapa posterior de TRAMA.
          </div>
        )
      )}
    </div>
  );
}
