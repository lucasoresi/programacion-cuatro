import { Vehiculo } from "./Vehiculo";

export class Auto extends Vehiculo {
  private puertas: number;

  constructor(marca: string, modelo: string, puertas: number) {
    super(marca, modelo);
    this.puertas = puertas;
  }

  mostrarInfo(): void {
    console.log(
      `Auto → Marca: ${this.marca}, Modelo: ${this.modelo}, Puertas: ${this.puertas}`
    );
  }
}