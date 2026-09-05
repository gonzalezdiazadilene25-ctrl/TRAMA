import introducciones from "@/data/introducciones.json";
import type { Introducciones, IntroSemestre } from "@/lib/types";

const data = introducciones as Introducciones;

export function getCarreraIntro() {
  return data.carrera;
}

export function getSemestreIntro(numero: number): IntroSemestre | undefined {
  const id = `s${String(numero).padStart(2, "0")}`;
  return data.semestres.find((s) => s.id === id);
}
