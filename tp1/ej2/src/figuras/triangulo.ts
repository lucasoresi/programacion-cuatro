import { FiguraGeometrica } from "./figuraGeometrica";
export class Triangulo extends FiguraGeometrica {
    private base: number;
    private altura: number;

    constructor(base:number,altura:number) {
        super("Triangulo");
        this.base = base;
        this.altura = altura;
    }
    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }
}