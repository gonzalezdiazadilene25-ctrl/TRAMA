import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">TRAMA</h1>
        <p className="mt-2 text-trama-gris">
          Temario, Repaso y Aprendizaje Modular Asistido — Ingeniería Textil, Plan 2018, ESIT-IPN.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/semestres"
          className="group rounded-3xl border border-trama-borde bg-trama-superficie p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ "--acento": "var(--trama-indigo)" } as React.CSSProperties}
        >
          <h2 className="text-lg font-semibold text-[var(--acento)]">Semestres</h2>
          <p className="mt-2 text-sm text-trama-gris">
            Los 9 semestres de la carrera, con sus unidades y créditos.
          </p>
        </Link>

        <Link
          href="/trayectorias"
          className="group rounded-3xl border border-trama-borde bg-trama-superficie p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ "--acento": "var(--trama-indigo)" } as React.CSSProperties}
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
