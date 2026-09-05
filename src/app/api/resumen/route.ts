import { NextRequest, NextResponse } from "next/server";
import { getAnthropicClient, contenidoTemaComoTexto, extraerJSON, MODELO_IA } from "@/lib/ia";
import type { Tema, ResumenIA } from "@/lib/types";

export async function POST(request: NextRequest) {
  let tema: Tema;
  let apuntes: string;
  try {
    const body = await request.json();
    tema = body.tema;
    apuntes = typeof body.apuntes === "string" ? body.apuntes : "";
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
  const apuntesTexto = apuntes.trim() ? `\n\nApuntes propios de la estudiante:\n${apuntes}` : "";

  try {
    const respuesta = await client.messages.create({
      model: MODELO_IA,
      max_tokens: 1024,
      system:
        "Eres un asistente de estudio para Ingeniería Textil. Resume el contenido y los apuntes " +
        "que te da la estudiante en conceptos clave, proceso y datos numéricos que debe memorizar, " +
        "sin agregar información externa que no esté en el material dado. " +
        "Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional antes o después, con esta forma exacta: " +
        '{"conceptosClave": string[], "proceso": string, "datosParaMemorizar": string[]}. ' +
        "Si el tema no tiene un proceso o datos numéricos relevantes, deja esos campos como arreglo u oración vacíos.",
      messages: [
        {
          role: "user",
          content: `Contenido del tema:\n${contenido}${apuntesTexto}`,
        },
      ],
    });

    const bloqueTexto = respuesta.content.find((b) => b.type === "text");
    if (!bloqueTexto || bloqueTexto.type !== "text") {
      throw new Error("La respuesta de la IA no contiene texto.");
    }

    const resumen = extraerJSON<ResumenIA>(bloqueTexto.text);
    return NextResponse.json({ resumen });
  } catch (err) {
    return NextResponse.json(
      { error: "No se pudo generar el resumen. Intenta de nuevo. " + (err as Error).message },
      { status: 502 }
    );
  }
}
