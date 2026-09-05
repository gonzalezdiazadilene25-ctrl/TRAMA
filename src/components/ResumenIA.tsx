"use client";

import { useState } from "react";
import { getApunte, setApunte } from "@/lib/storage";
import type { Tema, ResumenIA as ResumenIATipo } from "@/lib/types";

export default function ResumenIA({
  semestre,
  unidad,
  tema,
}: {
  semestre: number;
  unidad: string;
  tema: Tema;
}) {
  const [resumen, setResumen] = useState<ResumenIATipo | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guardado, setGuardado] = useState(false);

  async function generar() {
    setCargando(true);
    setError(null);
    setGuardado(false);
    try {
      const apuntes = getApunte(semestre, unidad, tema.slug);
      const res = await fetch("/api/resumen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, apuntes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error desconocido.");
      setResumen(data.resumen);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCargando(false);
    }
  }

  function guardarComoApunte() {
    if (!resumen) return;
    const texto =
      `Resumen IA — ${tema.titulo}\n\n` +
      `Conceptos clave:\n${resumen.conceptosClave.map((c) => `- ${c}`).join("\n")}\n\n` +
      `Proceso:\n${resumen.proceso}\n\n` +
      `Datos para memorizar:\n${resumen.datosParaMemorizar.map((d) => `- ${d}`).join("\n")}`;
    const actual = getApunte(semestre, unidad, tema.slug);
    setApunte(semestre, unidad, tema.slug, actual ? `${actual}\n\n${texto}` : texto);
    setGuardado(true);
  }

  return (
    <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Resumen IA
        </h2>
        <button
          type="button"
          onClick={generar}
          disabled={cargando}
          className="rounded-full bg-[var(--acento)] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          {cargando ? "Generando…" : resumen ? "Generar de nuevo" : "Generar resumen"}
        </button>
      </div>

      {error && <p className="text-sm text-trama-grana">{error}</p>}

      {resumen && (
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <h3 className="mb-1 font-semibold text-trama-texto">Conceptos clave</h3>
            <ul className="list-inside list-disc space-y-0.5 text-trama-texto">
              {resumen.conceptosClave.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          {resumen.proceso && (
            <div>
              <h3 className="mb-1 font-semibold text-trama-texto">Proceso</h3>
              <p className="text-trama-texto">{resumen.proceso}</p>
            </div>
          )}
          {resumen.datosParaMemorizar.length > 0 && (
            <div>
              <h3 className="mb-1 font-semibold text-trama-texto">Datos para memorizar</h3>
              <ul className="list-inside list-disc space-y-0.5 text-trama-texto">
                {resumen.datosParaMemorizar.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="button"
            onClick={guardarComoApunte}
            className="mt-1 w-fit rounded-full border border-trama-borde px-3 py-1.5 text-xs text-trama-gris hover:border-[var(--acento)] hover:text-[var(--acento)]"
          >
            {guardado ? "Guardado en Mis apuntes ✓" : "Guardar como apunte"}
          </button>
        </div>
      )}
    </section>
  );
}
