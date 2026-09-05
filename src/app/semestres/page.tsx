import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { semestres } from "@/lib/data";
import { getSemestreColor } from "@/lib/theme";

export const metadata = {
  title: "Semestres — TRAMA",
};

export default function SemestresPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Semestres" }]} />

      <h1 className="mb-5 text-2xl font-bold">Semestres</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        {semestres.map((s) => {
          const color = getSemestreColor(s.numero);
          return (
            <Link
              key={s.numero}
              href={`/semestres/${s.numero}`}
              className="group overflow-hidden rounded-3xl border border-trama-borde bg-trama-superficie shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className="relative flex h-28 items-end p-4"
                style={{
                  background: `linear-gradient(to top, ${color}, ${color}99 60%, ${color}33)`,
                }}
              >
                <span className="text-2xl font-bold text-white drop-shadow-sm">
                  {s.numero}.º semestre
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-trama-gris">{s.creditos} créditos</p>
                <p className="mt-2 text-sm text-trama-texto">{s.enfoque}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
