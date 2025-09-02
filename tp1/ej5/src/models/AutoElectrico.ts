import { Auto } from "./Auto";
import { Electrico } from "../interfaces/Electrico";

export class AutoElectrico extends Auto implements Electrico {
  private autonomia: number;

  constructor(marca: string, modelo: string, puertas: number, autonomia: number) {
    super(marca, modelo, puertas);
    this.autonomia = autonomia;
  }

  cargarBateria(): void {
    console.log(
      `El auto eléctrico ${this.marca} ${this.modelo} está cargando su batería.`
    );
  }

  mostrarInfo(): void {
    console.log(
      `Auto Eléctrico → Marca: ${this.marca}, Modelo: ${this.modelo}, Autonomía: ${this.autonomia}km`
    );
  }
}