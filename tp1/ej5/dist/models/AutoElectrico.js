"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoElectrico = void 0;
const Auto_1 = require("./Auto");
class AutoElectrico extends Auto_1.Auto {
    constructor(marca, modelo, puertas, autonomia) {
        super(marca, modelo, puertas);
        this.autonomia = autonomia;
    }
    cargarBateria() {
        console.log(`El auto eléctrico ${this.marca} ${this.modelo} está cargando su batería.`);
    }
    mostrarInfo() {
        console.log(`Auto Eléctrico → Marca: ${this.marca}, Modelo: ${this.modelo}, Autonomía: ${this.autonomia}km`);
    }
}
exports.AutoElectrico = AutoElectrico;
//# sourceMappingURL=AutoElectrico.js.map