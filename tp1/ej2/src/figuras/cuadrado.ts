import { FiguraGeometrica } from "./figuraGeometrica";

export class Cuadrado extends FiguraGeometrica {
	private lado: number;

	constructor(lado: number) {
        super("Cuadrado"); 
        this.lado = lado;

	}

	calcularArea(): number {
		return this.lado * this.lado;
		
	}
}