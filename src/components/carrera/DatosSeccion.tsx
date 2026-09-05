import type { DatoItem } from "@/lib/types";

export default function DatosSeccion({ titulo, datos }: { titulo: string; datos: DatoItem[] }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-lg font-semibold">{titulo}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {datos.map((d) => (
          <div
            key={d.etiqueta}
            className="rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-trama-gris">{d.etiqueta}</p>
            <p className="mt-1 font-medium text-trama-texto">{d.valor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
