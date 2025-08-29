import { FiguraGeometrica } from "./figuras/figuraGeometrica";
import { Circulo } from "./figuras/circulo";
import { Cuadrado } from "./figuras/cuadrado";
import { Triangulo } from "./figuras/triangulo";

const figura: FiguraGeometrica[] = [
    new Circulo(5),
    new Cuadrado(4),
    new Triangulo(3, 6)
];

for (const figuras of figura){
    console.log(`elarea de la figura ${figuras.getNombre()} es: ${figuras.calcularArea()}`);
}