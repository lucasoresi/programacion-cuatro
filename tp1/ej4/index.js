"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Creamos un array de personas
const personas = [
    { nombre: "Ana", edad: 28, ciudad: "Buenos Aires" },
    { nombre: "Carlos", edad: 35, ciudad: "Córdoba" },
    { nombre: "María", edad: 22, ciudad: "Rosario" }
];
// Función para saludar a una persona
function saludarPersona(persona) {
    const { nombre, edad, ciudad } = persona;
    console.log(`¡Hola, ${nombre}! Tienes ${edad} años y vives en ${ciudad}.`);
}
// Saludamos a cada persona
console.log("=== Saludos personalizados ===");
personas.forEach(saludarPersona);
// Función para encontrar personas mayores de cierta edad
function mayoresDe(personas, edadMinima) {
    return personas.filter(persona => persona.edad > edadMinima);
}
// Mostrar personas mayores de 25 años
console.log("\n=== Personas mayores de 25 años ===");
const mayores = mayoresDe(personas, 25);
mayores.forEach(p => console.log(`${p.nombre} (${p.edad} años)`));
//# sourceMappingURL=index.js.map