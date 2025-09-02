import { Vehiculo } from "./Vehiculo";

export class Moto extends Vehiculo {
  private cilindrada: number;

  constructor(marca: string, modelo: string, cilindrada: number) {
    super(marca, modelo);
    this.cilindrada = cilindrada;
  }

  mostrarInfo(): void {
    console.log(
      `Moto → Marca: ${this.marca}, Modelo: ${this.modelo}, Cilindrada: ${this.cilindrada}cc`
    );
  }
}