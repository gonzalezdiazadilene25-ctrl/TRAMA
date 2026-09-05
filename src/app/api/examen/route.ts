import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient, contenidoTemaComoTexto, extraerJSON, MODELO_IA } from "@/lib/ia";
import type { Tema, Reactivo } from "@/lib/types";

function reactivoValido(r: unknown): r is Reactivo {
  if (!r || typeof r !== "object") return false;
  const x = r as Record<string, unknown>;
  return (
    typeof x.pregunta === "string" &&
    Array.isArray(x.opciones) &&
    x.opciones.length === 4 &&
    x.opciones.every((o) => typeof o === "string") &&
    typeof x.respuestaCorrecta === "number" &&
    x.respuestaCorrecta >= 0 &&
    x.respuestaCorrecta <= 3 &&
    typeof x.explicacion === "string"
  );
}

export async function POST(request: NextRequest) {
  let tema: Tema;
  try {
    const body = await request.json();
    tema = body.tema;
  } catch {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido." }, { status: 400 });
  }

  if (!tema?.definicion) {
    return NextResponse.json({ error: "Falta el contenido del tema." }, { status: 400 });
  }

  let client;
  try {
    client = getAnthropicClient();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  const contenido = contenidoTemaComoTexto(tema);

  try {
    const respuesta = await client.messages.create({
      model: MODELO_IA,
      max_tokens: 2048,
      system:
        "Eres un generador de exámenes de práctica para Ingeniería Textil. A partir del contenido " +
        "de un tema, genera exactamente 10 reactivos de opción múltiple con una sola respuesta correcta, " +
        "basados únicamente en el contenido dado, sin inventar datos que no estén en el material. " +
        "Cada reactivo debe tener exactamente 4 opciones. " +
        "Responde ÚNICAMENTE con un arreglo JSON válido, sin texto adicional antes o después, " +
        'con esta forma exacta para cada elemento: {"pregunta": string, "opciones": string[4], ' +
        '"respuestaCorrecta": number (índice 0-3), "explicacion": string, "subtema": string}.',
      messages: [
        {
          role: "user",
          content: `Contenido del tema:\n${contenido}`,
        },
      ],
    });

    const bloqueTexto = respuesta.content.find((b) => b.type === "text");
    if (!bloqueTexto || bloqueTexto.type !== "text") {
      throw new Error("La respuesta de la IA no contiene texto.");
    }

    const reactivos = extraerJSON<unknown[]>(bloqueTexto.text);
    if (!Array.isArray(reactivos) || reactivos.length !== 10 || !reactivos.every(reactivoValido)) {
      throw new Error("La IA devolvió un examen con formato inválido.");
    }

    return NextResponse.json({ reactivos: reactivos as Reactivo[] });
  } catch (err) {
    return NextResponse.json(
      { error: "No se pudo generar el examen. Intenta de nuevo. " + (err as Error).message },
      { status: 502 }
    );
  }
}
