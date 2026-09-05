import Link from "next/link";
import ProgresoGeneral from "@/components/ProgresoGeneral";
import ContinuarDondeMeQuede from "@/components/ContinuarDondeMeQuede";
import { getTodosLosTemas } from "@/lib/progreso-general";

export default function Home() {
  const temas = getTodosLosTemas();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">TRAMA</h1>
        <p className="mt-2 text-trama-gris">
          Temario, Repaso y Aprendizaje Modular Asistido — Ingeniería Textil, Plan 2018, ESIT-IPN.
        </p>
      </div>

      <ProgresoGeneral temas={temas} />

      <ContinuarDondeMeQuede />

      <Link
        href="/carrera"
        className="block rounded-3xl border border-trama-borde bg-trama-superficie p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <h2 className="text-lg font-semibold text-[var(--acento)]">La carrera</h2>
        <p className="mt-2 text-sm text-trama-gris">
          Qué es la Ingeniería Textil, cómo está organizada y por qué la elección de trayectoria
          no tiene vuelta atrás.
        </p>
      </Link>

      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/semestres"
          className="rounded-3xl border border-trama-borde bg-trama-superficie p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-[var(--acento)]">Semestres</h2>
          <p className="mt-2 text-sm text-trama-gris">
            Los 9 semestres de la carrera, con sus unidades y créditos.
          </p>
        </Link>

        <Link
          href="/trayectorias"
          className="rounded-3xl border border-trama-borde bg-trama-superficie p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-[var(--acento)]">Trayectorias</h2>
          <p className="mt-2 text-sm text-trama-gris">
            Compara Hilados, Tejidos, Acabados y Confección antes de elegir en 5.º semestre.
          </p>
        </Link>
      </div>
    </div>
  );
}
