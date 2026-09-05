import Breadcrumb from "@/components/Breadcrumb";
import SeccionCarreraView from "@/components/carrera/SeccionCarreraView";
import { getCarreraIntro } from "@/lib/introducciones";

export const metadata = {
  title: "La carrera — TRAMA",
};

export default function CarreraPage() {
  const carrera = getCarreraIntro();

  return (
    <div>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "La carrera" }]} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{carrera.titulo}</h1>
        <p className="mt-1 text-sm text-trama-gris">{carrera.subtitulo}</p>
        <p className="mt-3 text-trama-texto">{carrera.entrada}</p>
      </div>

      {carrera.secciones.map((s, i) => (
        <SeccionCarreraView key={i} seccion={s} />
      ))}
    </div>
  );
}
