interface Volador {
  volar(): void;
}

abstract class Animal {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  abstract hacerSonido(): void;
}

class Pajaro extends Animal implements Volador {
  private especie: string;

  constructor(nombre: string, especie: string) {
    super(nombre);
    this.especie = especie;
  }

  hacerSonido(): void {
    console.log(`El ${this.especie} ${this.nombre} hace pío pío`);
  }

  volar(): void {
    console.log(`El ${this.especie} ${this.nombre} está volando`);
  }
}

class Zorro extends Animal {
  constructor(nombre: string, especie: string) {
    super(nombre);
  }

  hacerSonido(): void {
    console.log(`El zorro ${this.nombre} hace aullidos`);
  }
}

// Ejemplos
const pajaro = new Pajaro("Tweety", "Canario");
const zorro = new Zorro("Fox", "Rojo");

pajaro.hacerSonido();
pajaro.volar();

zorro.hacerSonido();