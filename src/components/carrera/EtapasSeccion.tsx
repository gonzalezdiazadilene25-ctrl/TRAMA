import type { EtapaItem } from "@/lib/types";
import { getSemestreColor } from "@/lib/theme";

function parseRango(rango: string): [number, number] {
  const nums = rango.match(/\d+/g)?.map(Number) ?? [1, 1];
  return nums.length >= 2 ? [nums[0], nums[1]] : [nums[0], nums[0]];
}

export default function EtapasSeccion({ titulo, etapas }: { titulo: string; etapas: EtapaItem[] }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-lg font-semibold">{titulo}</h2>
      <div className="flex flex-col gap-3">
        {etapas.map((e) => {
          const [inicio, fin] = parseRango(e.rango);
          const colorInicio = getSemestreColor(inicio);
          const colorFin = getSemestreColor(fin);
          return (
            <div
              key={e.rango}
              className="overflow-hidden rounded-2xl text-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${colorInicio}, ${colorFin})` }}
            >
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-white/80">{e.rango} semestre</p>
                <p className="mt-0.5 text-lg font-bold">{e.nombre}</p>
                <p className="mt-2 text-sm text-white/90">{e.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
