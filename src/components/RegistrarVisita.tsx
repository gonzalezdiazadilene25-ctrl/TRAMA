"use client";

import { useEffect } from "react";
import { setUltimoTema } from "@/lib/storage";

export default function RegistrarVisita({
  href,
  titulo,
  unidad,
}: {
  href: string;
  titulo: string;
  unidad: string;
}) {
  useEffect(() => {
    setUltimoTema({ href, titulo, unidad });
  }, [href, titulo, unidad]);

  return null;
}
