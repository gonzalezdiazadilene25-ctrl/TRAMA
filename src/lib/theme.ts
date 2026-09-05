export const semestreColores: Record<number, string> = {
  1: "#3B5BA9",
  2: "#17A2A2",
  3: "#2E9E6B",
  4: "#7CB518",
  5: "#F5A623",
  6: "#E2703A",
  7: "#C0392B",
  8: "#C2185B",
  9: "#7B3FA0",
};

export const trayectoriaColores: Record<string, string> = {
  hilados: "#B8860B",
  tejidos: "#1B6C8C",
  acabados: "#8E2DA8",
  confeccion: "#2F6B4F",
};

const ACENTO_DEFECTO = "var(--trama-indigo)";

export function getSemestreColor(numero: number): string {
  return semestreColores[numero] ?? ACENTO_DEFECTO;
}

export function getTrayectoriaColor(id: string): string {
  return trayectoriaColores[id] ?? ACENTO_DEFECTO;
}
