"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const Vehiculo_1 = require("./Vehiculo");
class Moto extends Vehiculo_1.Vehiculo {
    constructor(marca, modelo, cilindrada) {
        super(marca, modelo);
        this.cilindrada = cilindrada;
    }
    mostrarInfo() {
        console.log(`Moto → Marca: ${this.marca}, Modelo: ${this.modelo}, Cilindrada: ${this.cilindrada}cc`);
    }
}
exports.Moto = Moto;
//# sourceMappingURL=Moto.js.map