import type { SeccionCarrera } from "@/lib/types";
import CadenaSeccion from "./CadenaSeccion";
import DatosSeccion from "./DatosSeccion";
import EtapasSeccion from "./EtapasSeccion";
import AvisoSeccion from "./AvisoSeccion";
import PasosSeccion from "./PasosSeccion";
import ProcedenciaSeccion from "./ProcedenciaSeccion";

export default function SeccionCarreraView({ seccion }: { seccion: SeccionCarrera }) {
  switch (seccion.tipo) {
    case "cadena":
      return <CadenaSeccion titulo={seccion.titulo} pasos={seccion.pasos} cierre={seccion.cierre} />;
    case "datos":
      return <DatosSeccion titulo={seccion.titulo} datos={seccion.datos} />;
    case "etapas":
      return <EtapasSeccion titulo={seccion.titulo} etapas={seccion.etapas} />;
    case "aviso":
      return <AvisoSeccion titulo={seccion.titulo} texto={seccion.texto} accion={seccion.accion} />;
    case "pasos":
      return <PasosSeccion titulo={seccion.titulo} pasos={seccion.pasos} />;
    case "procedencia":
      return <ProcedenciaSeccion titulo={seccion.titulo} texto={seccion.texto} />;
    default:
      return null;
  }
}
