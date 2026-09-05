import Link from "next/link";
import type { AccionSeccion } from "@/lib/types";

export default function AvisoSeccion({
  titulo,
  texto,
  accion,
}: {
  titulo: string;
  texto: string;
  accion?: AccionSeccion;
}) {
  return (
    <section className="mb-6 rounded-2xl border-2 border-trama-grana bg-trama-grana/5 p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-trama-grana">{titulo}</h2>
      <p className="text-trama-texto">{texto}</p>
      {accion && (
        <Link
          href={accion.destino}
          className="mt-4 inline-block rounded-full bg-trama-grana px-4 py-2 text-sm text-white"
        >
          {accion.texto}
        </Link>
      )}
    </section>
  );
}
