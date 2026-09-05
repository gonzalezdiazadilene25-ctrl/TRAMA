import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TemasList from "@/components/TemasList";
import { getSemestre } from "@/lib/data";
import { getContenidoUnidad } from "@/lib/contenido";
import { slugify } from "@/lib/slug";

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

      <h1 className="mb-1 text-2xl font-bold">{unidad.nombre}</h1>
      <p className="mb-6 text-sm text-trama-gris">{semestre.numero}.º semestre</p>

      {contenido ? (
        <>
          <h2 className="mb-3 text-lg font-semibold">Temas</h2>
          <TemasList
            temas={contenido.temas}
            semestre={semestre.numero}
            unidadSlug={unidadSlug}
          />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-trama-borde bg-trama-superficie p-5 text-trama-gris">
          El contenido de esta unidad todavía está en desarrollo. Por ahora, apóyate en tus
          apuntes de clase — esta vista se completará en una etapa posterior de TRAMA.
        </div>
      )}
    </div>
  );
}
