import { FiguraGeometrica } from "./figuraGeometrica";

export class Circulo extends FiguraGeometrica {
    private radio: number;

    constructor(radio: number) {
        super("Circulo");
        this.radio = radio;
    }
    calcularArea(): number {
        return Math.PI * this.radio * this.radio;
    }
}