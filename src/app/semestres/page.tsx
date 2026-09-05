import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { semestres } from "@/lib/data";

export const metadata = {
  title: "Semestres — TRAMA",
};

export default function SemestresPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Semestres" }]} />

      <h1 className="mb-4 text-2xl font-bold">Semestres</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {semestres.map((s) => (
          <Link
            key={s.numero}
            href={`/semestres/${s.numero}`}
            className="rounded-lg border border-trama-gris/30 bg-white p-5 transition-colors hover:border-trama-indigo"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{s.numero}.º semestre</h2>
              <span className="text-sm text-trama-gris">{s.creditos} créditos</span>
            </div>
            <p className="mt-2 text-sm text-trama-gris">{s.enfoque}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
