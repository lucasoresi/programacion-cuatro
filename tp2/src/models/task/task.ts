export class Task<ID>{
    constructor(
        protected id: ID,
        protected pizza: string,
        protected tamanio: string,
        protected status: string,
        protected toppings: string,
        protected precio: number
    ){
        this.id = id;
        this.tamanio = tamanio;
        this.status = status;
        this.toppings = toppings;
        this.pizza = pizza;
        this.precio = precio;
    }


    getId(): ID {
        return this.id;
    }
    getPizza(): string {
        return this.pizza;
    }
    getTamanio(): string {
        return this.tamanio;
    }
    getStatus(): string { 
        return this.status;
    }
    getToppings(): string {
        return this.toppings;
    }
    getPrecio(): number {
        return this.precio;
    }
}