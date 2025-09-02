import { Empleado } from './empleado';

export class EmpleadoMedioTiempo extends Empleado {
    calcularSalario(): number {
        return this.salarioBase * 0.5;  //cobra el 50% del salario base
    }
}