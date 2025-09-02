export abstract class Empleado {
    constructor(protected nombre:string, protected salarioBase:number) {
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }
    abstract calcularSalario(): number;

    getNombre(): string {
        return this.nombre;
    }

}