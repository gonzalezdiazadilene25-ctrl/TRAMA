import type { PasoCadena } from "@/lib/types";

export default function CadenaSeccion({
  titulo,
  pasos,
  cierre,
}: {
  titulo: string;
  pasos: PasoCadena[];
  cierre?: string;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-lg font-semibold">{titulo}</h2>
      <div className="-mx-4 overflow-x-auto px-4 pb-2">
        <div className="flex w-max gap-2">
          {pasos.map((p, i) => (
            <div key={p.nombre} className="flex items-center gap-2">
              <div className="w-44 shrink-0 rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm">
                <p className="font-semibold text-[var(--acento)]">{p.nombre}</p>
                <p className="mt-1 text-sm text-trama-texto">{p.descripcion}</p>
              </div>
              {i < pasos.length - 1 && (
                <span className="shrink-0 text-xl text-trama-gris" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {cierre && <p className="mt-3 text-sm text-trama-gris">{cierre}</p>}
    </section>
  );
}
