"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auto_1 = require("./models/Auto");
const Moto_1 = require("./models/Moto");
const AutoElectrico_1 = require("./models/AutoElectrico");
const auto = new Auto_1.Auto("Toyota", "Corolla", 4);
const moto = new Moto_1.Moto("Honda", "CBR", 600);
const autoElectrico = new AutoElectrico_1.AutoElectrico("Tesla", "Model 3", 4, 500);
auto.mostrarInfo();
moto.mostrarInfo();
autoElectrico.mostrarInfo();
autoElectrico.cargarBateria();
//# sourceMappingURL=index.js.map