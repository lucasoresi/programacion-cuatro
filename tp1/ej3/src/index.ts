import { EmpleadoTiempoCompleto } from './models/empleadoTiempoCompleto';
import { EmpleadoMedioTiempo } from './models/empleadoMedioTiempo';
import { Empleado } from './models/empleado';


//demostracion de polimorfismo
const empleados: Empleado[] = [
    new EmpleadoTiempoCompleto("Ana", 80000),
    new EmpleadoMedioTiempo("Juan", 60000),
    new EmpleadoTiempoCompleto("Pedro", 90000),
];

for (const emp of empleados) {
    console.log(`${emp.getNombre()} cobra: $${emp.calcularSalario()}`);
}
