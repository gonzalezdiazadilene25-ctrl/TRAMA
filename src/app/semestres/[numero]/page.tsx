import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getSemestre, semestres } from "@/lib/data";
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

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Semestres", href: "/semestres" },
          { label: `${semestre.numero}.º semestre` },
        ]}
      />

      <div className="mb-6 rounded-3xl bg-[var(--acento)] p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">{semestre.numero}.º semestre</h1>
        <p className="mt-1 text-sm text-white/80">
          {semestre.creditos} créditos · {semestre.porcentaje}% del total de la carrera
        </p>
        <p className="mt-3">{semestre.enfoque}</p>
      </div>

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
