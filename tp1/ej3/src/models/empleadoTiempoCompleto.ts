import { Empleado } from './empleado';

export class EmpleadoTiempoCompleto extends Empleado {
    private bono: number = 20000;

    calcularSalario(): number {
        return this.salarioBase + this.bono;  //suma un bono fijo de $20.000 al salario base
    }
}