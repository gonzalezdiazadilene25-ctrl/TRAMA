"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUltimoTema, type UltimoTema } from "@/lib/storage";

export default function ContinuarDondeMeQuede() {
  const [ultimo, setUltimo] = useState<UltimoTema | null>(null);

  useEffect(() => {
    setUltimo(getUltimoTema());
  }, []);

  if (!ultimo) return null;

  return (
    <Link
      href={ultimo.href}
      className="block rounded-2xl border border-trama-borde bg-trama-superficie p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-xs uppercase tracking-wide text-trama-gris">Continuar donde me quedé</p>
      <p className="mt-1 font-semibold text-[var(--acento)]">{ultimo.titulo}</p>
      <p className="text-sm text-trama-gris">{ultimo.unidad}</p>
    </Link>
  );
}
