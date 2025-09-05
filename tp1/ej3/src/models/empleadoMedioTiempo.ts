import { Empleado } from './empleado';

export class EmpleadoMedioTiempo extends Empleado {
    constructor(nombre:string, salarioBase:number){
        super(nombre, salarioBase);
    }
    calcularSalario(): number {
        return this.salarioBase * 0.5;  //cobra el 50% del salario base
    }
}