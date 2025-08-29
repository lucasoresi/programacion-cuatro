export abstract class FiguraGeometrica {
    constructor(protected nombre:string) {
        this.nombre = nombre;
    }
    abstract calcularArea(): number;

    getNombre(): string {
        return this.nombre;
    }

}