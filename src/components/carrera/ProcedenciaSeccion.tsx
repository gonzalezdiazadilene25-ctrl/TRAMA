export default function ProcedenciaSeccion({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <section className="mb-6 border-t border-trama-borde pt-4">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-trama-gris">
        {titulo}
      </h2>
      <p className="text-xs text-trama-gris">{texto}</p>
    </section>
  );
}
