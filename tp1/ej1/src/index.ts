import { Animal } from "./modelos/animal";
import { Perro } from "./modelos/perro";

const miPerro: Animal = new Perro();
miPerro.hacerSonido();
miPerro.moverse();
