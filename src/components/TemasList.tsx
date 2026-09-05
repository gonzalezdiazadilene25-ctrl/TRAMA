"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProgreso, type EstadoTema } from "@/lib/storage";
import type { Tema } from "@/lib/types";

const colorPorEstado: Record<EstadoTema, string> = {
  nuevo: "bg-trama-gris",
  "en-curso": "bg-[var(--acento)]",
  dominado: "bg-trama-grana",
};

export default function TemasList({
  temas,
  semestre,
  unidadSlug,
}: {
  temas: Tema[];
  semestre: number;
  unidadSlug: string;
}) {
  const [estados, setEstados] = useState<Record<string, EstadoTema>>({});

  useEffect(() => {
    const siguiente: Record<string, EstadoTema> = {};
    temas.forEach((t) => {
      siguiente[t.slug] = getProgreso(semestre, unidadSlug, t.slug);
    });
    setEstados(siguiente);
  }, [temas, semestre, unidadSlug]);

  return (
    <ul className="flex flex-col gap-3">
      {temas.map((t) => (
        <li key={t.slug}>
          <Link
            href={`/semestres/${semestre}/${unidadSlug}/${t.slug}`}
            className="flex items-center justify-between rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--acento)] hover:shadow-md"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorPorEstado[estados[t.slug] ?? "nuevo"]}`}
                aria-hidden
              />
              {t.titulo}
            </span>
            {t.nombreCientifico && (
              <span className="text-sm italic text-trama-gris">{t.nombreCientifico}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
