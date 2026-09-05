export default function PasosSeccion({ titulo, pasos }: { titulo: string; pasos: string[] }) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-lg font-semibold">{titulo}</h2>
      <ol className="flex flex-col gap-3">
        {pasos.map((p, i) => (
          <li key={p} className="flex gap-3 rounded-2xl border border-trama-borde bg-trama-superficie p-4 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--acento)] text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-trama-texto">{p}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
