import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getSemestre, semestres } from "@/lib/data";

export function generateStaticParams() {
  return semestres.map((s) => ({ numero: String(s.numero) }));
}

const badgeStyles: Record<string, string> = {
  trayectoria: "bg-trama-grana/10 text-trama-grana",
  eje: "bg-trama-indigo/10 text-trama-indigo",
  fija: "bg-trama-gris/10 text-trama-gris",
};

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

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{semestre.numero}.º semestre</h1>
        <p className="mt-1 text-sm text-trama-gris">
          {semestre.creditos} créditos · {semestre.porcentaje}% del total de la carrera
        </p>
        <p className="mt-2 text-trama-texto">{semestre.enfoque}</p>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Unidades de aprendizaje</h2>
      <ul className="flex flex-col gap-3">
        {semestre.unidades.map((u) => {
          const contenido = (
            <div className="flex items-center justify-between rounded-lg border border-trama-gris/30 bg-white p-4">
              <span>{u.nombre}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${badgeStyles[u.tipo]}`}>
                {badgeLabels[u.tipo]}
              </span>
            </div>
          );

          return (
            <li key={u.nombre}>
              {u.tipo === "trayectoria" ? (
                <Link href="/trayectorias">{contenido}</Link>
              ) : (
                contenido
              )}
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
