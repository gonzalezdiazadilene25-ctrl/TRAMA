"use client";

import { useEffect, useState } from "react";
import { getProgreso, setProgreso, type EstadoTema } from "@/lib/storage";

const opciones: { value: EstadoTema; label: string }[] = [
  { value: "nuevo", label: "Nuevo" },
  { value: "en-curso", label: "En curso" },
  { value: "dominado", label: "Dominado" },
];

export default function ProgresoSelector({
  semestre,
  unidad,
  tema,
}: {
  semestre: number;
  unidad: string;
  tema: string;
}) {
  const [estado, setEstado] = useState<EstadoTema>("nuevo");

  useEffect(() => {
    setEstado(getProgreso(semestre, unidad, tema));
  }, [semestre, unidad, tema]);

  function elegir(valor: EstadoTema) {
    setEstado(valor);
    setProgreso(semestre, unidad, tema, valor);
  }

  return (
    <div className="mb-5 flex gap-2">
      {opciones.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => elegir(o.value)}
          className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
            estado === o.value
              ? "bg-[var(--acento)] text-white"
              : "border border-trama-borde bg-trama-superficie text-trama-gris"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
