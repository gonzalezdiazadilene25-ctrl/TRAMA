import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getSemestre, semestres } from "@/lib/data";
import { getSemestreIntro } from "@/lib/introducciones";
import { slugify } from "@/lib/slug";

export function generateStaticParams() {
  return semestres.map((s) => ({ numero: String(s.numero) }));
}

const badgeLabels: Record<string, string> = {
  trayectoria: "trayectoria",
  eje: "eje optativo",
  fija: "unidad",
};

export default async function SemestrePage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  const semestre = getSemestre(Number(numero));
  if (!semestre) notFound();

  const intro = getSemestreIntro(semestre.numero);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Semestres", href: "/semestres" },
          { label: `${semestre.numero}.º semestre` },
        ]}
      />

      <div className="relative mb-6 overflow-hidden rounded-3xl p-6 text-white shadow-sm">
        {semestre.imagen && (
          <Image
            src={`/img/${semestre.imagen}`}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 640px) 768px, 100vw"
            priority
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--acento) 88%, transparent), color-mix(in srgb, var(--acento) 65%, transparent))",
          }}
        />
        <div className="relative">
          <h1 className="text-2xl font-bold">{semestre.numero}.º semestre</h1>
          <p className="mt-1 text-sm text-white/80">
            {semestre.creditos} créditos · {semestre.porcentaje}% del total de la carrera
          </p>
          <p className="mt-3 font-medium">{intro?.eje ?? semestre.enfoque}</p>
        </div>
      </div>

      {intro && (
        <>
          <p className="mb-5 text-trama-texto">{intro.entrada}</p>

          <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
              Qué aprendes
            </h2>
            <ul className="list-inside list-disc space-y-1 text-trama-texto">
              {intro.que_aprendes.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </section>

          <section className="mb-5 rounded-2xl p-5 text-white shadow-sm" style={{ background: "var(--acento)" }}>
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-white/80">
              Prioridad
            </h2>
            <p>{intro.prioridad}</p>
          </section>

          {intro.conexion_siguiente && (
            <p className="mb-6 text-sm text-trama-gris">
              <span className="font-semibold text-trama-texto">Después de este semestre: </span>
              {intro.conexion_siguiente}
            </p>
          )}
        </>
      )}

      <h2 className="mb-3 text-lg font-semibold">Unidades de aprendizaje</h2>
      <ul className="flex flex-col gap-3">
        {semestre.unidades.map((u) => {
          const href =
            u.tipo === "trayectoria"
              ? "/trayectorias"
              : `/semestres/${semestre.numero}/${slugify(u.nombre)}`;

          return (
            <li key={u.nombre}>
              <Link
                href={href}
                className="flex items-center justify-between rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--acento)] hover:shadow-md"
              >
                <span>{u.nombre}</span>
                <span className="rounded-full bg-[var(--acento)]/10 px-2 py-0.5 text-xs text-[var(--acento)]">
                  {badgeLabels[u.tipo]}
                </span>
              </Link>
              {u.verificar && (
                <p className="mt-1 px-1 text-xs text-trama-grana">
                  Pendiente de verificar en tu tira de materias (SAES).
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
