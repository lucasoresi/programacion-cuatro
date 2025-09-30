import { TaskCrude } from "./interface/taskCrude.interface";
import { Task } from "./task";

export class MockTask implements TaskCrude<number>{
    protected tam:number;
    protected container: Array<Task<number>>;
    constructor(){
        this.tam = 0;
        this.container = new Array<Task<number>>();
    }
    size(): number {
        return this.tam;
    }
    getTasks(): Task<number> {
        throw new Error("Method not implemented.");
    }
    addTask(pizza: Task<number>): void {
        this.container.push(pizza);
        this.tam++;
    }
    getTask(id: number): Task<number> {
            const resultado = this.container.find((pizza:Task<number>) => {
            return pizza.getId() === id;
        });
        if(resultado === undefined){
            throw new Error("No se encontro la pizza");
        }
        return resultado;
    }
    deleteTask(id: number): void {
        throw new Error("Method not implemented.");
    }
    editTask(id: number, pizza: string): Task<number>;
    editTask(id: number, status: string): Task<number>;
    editTask(id: number, tamanio: string): Task<number>;
    editTask(id: number, toppings: string): Task<number>;
    editTask(id: number, precio: number): Task<number>;
    editTask(id:number, pizza:string, status:string, tamanio:string, toppings:string, precio:string): Task<number>;
    editTask(
        id: unknown, pizza: unknown, status?:unknown, tamanio?:unknown, toppings?:unknown, precio?: unknown)
        : import("./task").Task<number> {
        throw new Error("Method not implemented.");
    }
}
