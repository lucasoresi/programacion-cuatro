
export class Task{
    constructor(
        
        protected pizza: string,
        protected tamanio: string,
        protected status: string,
        protected toppings: string,
        protected precio: number,
        protected id: string = ""
    ){
        this.id = id;
        this.tamanio = tamanio;
        this.status = status;
        this.toppings = toppings;
        this.pizza = pizza;
        this.precio = precio;
    }
    
    public getsring(): string {
        return `Id: ${this.id}, Pizza: ${this.pizza}, Tamanio: ${this.tamanio}, Status: ${this.status}, Toppings: ${this.toppings}, Precio: ${this.precio}`;
    }

    public getId():string {
        return this.id;
    }
    public getPizza(): string {
        return this.pizza;
    }
    public getTamanio(): string {
        return this.tamanio;
    }
    public getStatus(): string { 
        return this.status;
    }
    public getToppings(): string {
        return this.toppings;
    }
    public getPrecio(): number {
         return this.precio;
    }
    public setID(id:string):void{
        this.id = id
    }
    public setPizza(pizza: string): void {
        this.pizza = pizza;
    }
    public setTamanio(tamanio: string): void { 
        this.tamanio = tamanio;
    }
    public setStatus(status: string): void {   
        this.status = status;
    }
    public setToppings(toppings: string): void {
        this.toppings = toppings;
    }
    public setPrecio(precio: number): void {
        this.precio = precio;
    }


}