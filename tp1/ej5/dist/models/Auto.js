"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
const Vehiculo_1 = require("./Vehiculo");
class Auto extends Vehiculo_1.Vehiculo {
    constructor(marca, modelo, puertas) {
        super(marca, modelo);
        this.puertas = puertas;
    }
    mostrarInfo() {
        console.log(`Auto → Marca: ${this.marca}, Modelo: ${this.modelo}, Puertas: ${this.puertas}`);
    }
}
exports.Auto = Auto;
//# sourceMappingURL=Auto.js.map