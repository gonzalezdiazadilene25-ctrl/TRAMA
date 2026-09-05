import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { trayectorias } from "@/lib/data";
import { getTrayectoriaColor } from "@/lib/theme";

export const metadata = {
  title: "Trayectorias — TRAMA",
};

export default function TrayectoriasPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Trayectorias" }]} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Trayectorias</h1>
        <p className="mt-2 text-trama-texto">
          La trayectoria se elige en 5.º semestre y no se permite cambio posterior. Compara las
          cuatro antes de decidir.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {trayectorias.map((t) => {
          const color = getTrayectoriaColor(t.id);
          return (
            <section key={t.id} id={t.id} className="overflow-hidden rounded-3xl shadow-sm">
              <div className="relative h-32">
                {t.imagen && (
                  <Image
                    src={`/img/${t.imagen}`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 768px, 100vw"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${color}, color-mix(in srgb, ${color} 35%, transparent) 75%)`,
                  }}
                />
                <h2 className="absolute bottom-4 left-6 text-xl font-bold text-white drop-shadow-sm">
                  {t.nombre}
                </h2>
              </div>

              <div className="p-6 text-white" style={{ background: color }}>
                <p className="text-sm text-white/85">{t.resumen}</p>

                <div className="mt-5 flex flex-col gap-3">
                  {t.semestres.map((s) => (
                    <div key={s.numero} className="flex gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="w-10 shrink-0 text-sm font-semibold">{s.numero}.º</span>
                      <ul className="list-inside list-disc text-sm text-white/95">
                        {s.unidades.map((u) => (
                          <li key={u}>{u}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
