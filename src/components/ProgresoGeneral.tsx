"use client";

import { useEffect, useState } from "react";
import { getProgreso } from "@/lib/storage";
import type { TemaConRuta } from "@/lib/progreso-general";

export default function ProgresoGeneral({ temas }: { temas: TemaConRuta[] }) {
  const [conteo, setConteo] = useState({ dominado: 0, enCurso: 0, total: temas.length });

  useEffect(() => {
    let dominado = 0;
    let enCurso = 0;
    for (const t of temas) {
      const estado = getProgreso(t.semestre, t.unidadSlug, t.temaSlug);
      if (estado === "dominado") dominado++;
      else if (estado === "en-curso") enCurso++;
    }
    setConteo({ dominado, enCurso, total: temas.length });
  }, [temas]);

  if (conteo.total === 0) return null;

  const porcentaje = Math.round((conteo.dominado / conteo.total) * 100);

  return (
    <div className="rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Progreso general
        </h2>
        <span className="text-sm text-trama-gris">
          {conteo.dominado} de {conteo.total} temas dominados
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-trama-hueso">
        <div
          className="h-full bg-[var(--acento)] transition-all"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
