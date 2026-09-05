import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">TRAMA</h1>
        <p className="mt-1 text-trama-gris">
          Temario, Repaso y Aprendizaje Modular Asistido — Ingeniería Textil, Plan 2018, ESIT-IPN.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/semestres"
          className="rounded-lg border border-trama-gris/30 bg-white p-5 transition-colors hover:border-trama-indigo"
        >
          <h2 className="text-lg font-semibold text-trama-indigo">Semestres</h2>
          <p className="mt-1 text-sm text-trama-gris">
            Los 9 semestres de la carrera, con sus unidades y créditos.
          </p>
        </Link>

        <Link
          href="/trayectorias"
          className="rounded-lg border border-trama-gris/30 bg-white p-5 transition-colors hover:border-trama-indigo"
        >
          <h2 className="text-lg font-semibold text-trama-indigo">Trayectorias</h2>
          <p className="mt-1 text-sm text-trama-gris">
            Compara Hilados, Tejidos, Acabados y Confección antes de elegir en 5.º semestre.
          </p>
        </Link>
      </div>
    </div>
  );
}
