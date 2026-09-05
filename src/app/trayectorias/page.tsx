import Breadcrumb from "@/components/Breadcrumb";
import { trayectorias } from "@/lib/data";

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
        {trayectorias.map((t) => (
          <section
            key={t.id}
            id={t.id}
            className="rounded-lg border border-trama-gris/30 bg-white p-5"
          >
            <h2 className="text-lg font-semibold text-trama-indigo">{t.nombre}</h2>
            <p className="mt-1 text-sm text-trama-gris">{t.resumen}</p>

            <div className="mt-4 flex flex-col gap-3">
              {t.semestres.map((s) => (
                <div key={s.numero} className="flex gap-3">
                  <span className="w-10 shrink-0 text-sm font-semibold text-trama-grana">
                    {s.numero}.º
                  </span>
                  <ul className="list-inside list-disc text-sm text-trama-texto">
                    {s.unidades.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
