import Anthropic from "@anthropic-ai/sdk";
import type { Tema } from "@/lib/types";

export const MODELO_IA = "claude-haiku-4-5-20251001";

export function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Falta configurar ANTHROPIC_API_KEY en las variables de entorno del proyecto."
    );
  }
  return new Anthropic({ apiKey });
}

export function contenidoTemaComoTexto(tema: Tema): string {
  const partes: string[] = [`Tema: ${tema.titulo}`];
  if (tema.nombreCientifico) partes.push(`Nombre científico / alterno: ${tema.nombreCientifico}`);
  partes.push(`Definición: ${tema.definicion}`);

  if (tema.composicion) {
    partes.push(
      "Composición: " +
        tema.composicion.map((c) => `${c.componente} ${c.valor}`).join(", ")
    );
  }
  if (tema.composicionNota) partes.push(`Composición: ${tema.composicionNota}`);

  if (tema.fichaTecnica) {
    partes.push(
      "Ficha técnica: " +
        tema.fichaTecnica.map((f) => `${f.propiedad}: ${f.valor}`).join(", ")
    );
  }

  if (tema.caracteristicas) {
    partes.push("Características:\n" + tema.caracteristicas.map((c) => `- ${c}`).join("\n"));
  }

  return partes.join("\n");
}

/** Extrae el primer bloque JSON de una respuesta de texto, tolerando ```json ... ``` */
export function extraerJSON<T>(texto: string): T {
  const limpio = texto.replace(/```json/gi, "```").trim();
  const match = limpio.match(/```([\s\S]*?)```/);
  const candidato = match ? match[1].trim() : limpio;
  return JSON.parse(candidato) as T;
}
