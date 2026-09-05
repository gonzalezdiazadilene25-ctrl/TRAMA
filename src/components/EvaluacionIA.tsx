"use client";

import { useState } from "react";
import { setProgreso } from "@/lib/storage";
import type { Tema, Reactivo } from "@/lib/types";

type Fase = "inicio" | "cargando" | "error" | "en-curso" | "resultado";

export default function EvaluacionIA({
  semestre,
  unidad,
  tema,
}: {
  semestre: number;
  unidad: string;
  tema: Tema;
}) {
  const [fase, setFase] = useState<Fase>("inicio");
  const [reactivos, setReactivos] = useState<Reactivo[]>([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function iniciar() {
    setFase("cargando");
    setError(null);
    try {
      const res = await fetch("/api/examen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error desconocido.");
      setReactivos(data.reactivos);
      setIndice(0);
      setSeleccion(null);
      setRespuestas([]);
      setFase("en-curso");
    } catch (err) {
      setError((err as Error).message);
      setFase("error");
    }
  }

  function elegir(opcion: number) {
    if (seleccion !== null) return;
    setSeleccion(opcion);
  }

  function siguiente() {
    if (seleccion === null) return;
    const nuevasRespuestas = [...respuestas, seleccion];
    setRespuestas(nuevasRespuestas);
    setSeleccion(null);
    if (indice + 1 < reactivos.length) {
      setIndice(indice + 1);
    } else {
      const correctas = nuevasRespuestas.filter((r, i) => r === reactivos[i].respuestaCorrecta).length;
      if (correctas >= 8) setProgreso(semestre, unidad, tema.slug, "dominado");
      else setProgreso(semestre, unidad, tema.slug, "en-curso");
      setFase("resultado");
    }
  }

  if (fase === "inicio" || fase === "error") {
    return (
      <section className="mb-6 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Evaluación
        </h2>
        {error && <p className="mb-2 text-sm text-trama-grana">{error}</p>}
        <button
          type="button"
          onClick={iniciar}
          className="rounded-full bg-[var(--acento)] px-4 py-2 text-sm text-white"
        >
          Generar examen de 10 reactivos
        </button>
      </section>
    );
  }

  if (fase === "cargando") {
    return (
      <section className="mb-6 rounded-2xl border border-trama-borde bg-trama-superficie p-5 text-sm text-trama-gris shadow-sm">
        Generando examen…
      </section>
    );
  }

  if (fase === "resultado") {
    const correctas = respuestas.filter((r, i) => r === reactivos[i].respuestaCorrecta).length;
    const fallados = reactivos.filter((r, i) => respuestas[i] !== r.respuestaCorrecta);
    const subtemasFallados = [...new Set(fallados.map((r) => r.subtema).filter(Boolean))];

    return (
      <section className="mb-6 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--acento)]">
          Resultado
        </h2>
        <p className="mb-3 text-lg font-bold text-trama-texto">{correctas} / {reactivos.length}</p>

        {subtemasFallados.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-1 text-sm font-semibold text-trama-texto">Puntos a reforzar</h3>
            <ul className="list-inside list-disc text-sm text-trama-texto">
              {subtemasFallados.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {reactivos.map((r, i) => {
            const acerto = respuestas[i] === r.respuestaCorrecta;
            return (
              <div key={i} className="rounded-xl border border-trama-borde p-3 text-sm">
                <p className="font-medium text-trama-texto">
                  {i + 1}. {r.pregunta}
                </p>
                <p className={acerto ? "text-trama-gris" : "text-trama-grana"}>
                  Tu respuesta: {r.opciones[respuestas[i]]} {acerto ? "✓" : "✗"}
                </p>
                {!acerto && (
                  <p className="text-trama-gris">Correcta: {r.opciones[r.respuestaCorrecta]}</p>
                )}
                <p className="mt-1 text-trama-gris">{r.explicacion}</p>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={iniciar}
          className="mt-4 rounded-full border border-trama-borde px-4 py-2 text-sm text-trama-gris hover:border-[var(--acento)] hover:text-[var(--acento)]"
        >
          Generar otro examen
        </button>
      </section>
    );
  }

  const reactivo = reactivos[indice];
  return (
    <section className="mb-6 rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-trama-gris">
        <span className="uppercase tracking-wide text-[var(--acento)]">Evaluación</span>
        <span>
          Reactivo {indice + 1} de {reactivos.length}
        </span>
      </div>
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-trama-hueso">
        <div
          className="h-full bg-[var(--acento)] transition-all"
          style={{ width: `${((indice + (seleccion !== null ? 1 : 0)) / reactivos.length) * 100}%` }}
        />
      </div>

      <p className="mb-3 font-medium text-trama-texto">{reactivo.pregunta}</p>

      <div className="flex flex-col gap-2">
        {reactivo.opciones.map((op, i) => {
          const esCorrecta = i === reactivo.respuestaCorrecta;
          const esSeleccion = i === seleccion;
          let estilo = "border-trama-borde bg-trama-hueso text-trama-texto";
          if (seleccion !== null) {
            if (esCorrecta) estilo = "border-trama-grana bg-trama-grana/10 text-trama-texto";
            else if (esSeleccion) estilo = "border-trama-gris bg-trama-gris/10 text-trama-gris";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => elegir(i)}
              disabled={seleccion !== null}
              className={`rounded-xl border p-3 text-left text-sm transition-colors ${estilo}`}
            >
              {op}
            </button>
          );
        })}
      </div>

      {seleccion !== null && (
        <div className="mt-3">
          <p className="text-sm text-trama-gris">{reactivo.explicacion}</p>
          <button
            type="button"
            onClick={siguiente}
            className="mt-3 rounded-full bg-[var(--acento)] px-4 py-2 text-sm text-white"
          >
            {indice + 1 < reactivos.length ? "Siguiente" : "Ver resultado"}
          </button>
        </div>
      )}
    </section>
  );
}
