import { Animal } from "./animal";

export class Perro implements Animal {
    hacerSonido(): void {
        console.log("Guau Guau");
    }
    moverse(): void {
        console.log("El perro corre");
    }
}