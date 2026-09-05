"use client";

import { useEffect, useRef, useState } from "react";
import { getApunte, setApunte } from "@/lib/storage";

export default function ApuntesEditor({
  semestre,
  unidad,
  tema,
}: {
  semestre: number;
  unidad: string;
  tema: string;
}) {
  const [texto, setTexto] = useState("");
  const [guardado, setGuardado] = useState<string | null>(null);
  const cargado = useRef(false);

  useEffect(() => {
    setTexto(getApunte(semestre, unidad, tema));
    cargado.current = true;
  }, [semestre, unidad, tema]);

  useEffect(() => {
    if (!cargado.current) return;
    const id = setTimeout(() => {
      setApunte(semestre, unidad, tema, texto);
      setGuardado(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    }, 500);
    return () => clearTimeout(id);
  }, [texto, semestre, unidad, tema]);

  return (
    <section className="mb-5 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Mis apuntes
        </h2>
        {guardado && <span className="text-xs text-trama-gris">Guardado {guardado}</span>}
      </div>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe aquí tus apuntes de clase sobre este tema..."
        rows={5}
        className="w-full resize-y rounded-xl border border-trama-borde bg-trama-hueso p-3 text-trama-texto outline-none focus:border-[var(--acento)]"
      />
      <p className="mt-2 text-xs text-trama-gris">
        Se guarda automáticamente en este navegador (no se sube a ningún servidor).
      </p>
    </section>
  );
}
