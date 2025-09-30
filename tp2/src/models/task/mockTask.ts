import { TaskCrude } from "./interface/taskCrude.interface";
import { Task } from "./task";

export class MockTask implements TaskCrude<number>{
    getTasks(): Task<number> {
        throw new Error("Method not implemented.");
    }
    addTask(pizza: Task<number>): void {
        throw new Error("Method not implemented.");
    }
    getTask(id: number): Task<number> {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: number): void {
        throw new Error("Method not implemented.");
    }
    editTask(id: number, pizza: string): Task<number>;
    editTask(id: number, status: string): Task<number>;
    editTask(id: number, tamanio: string): Task<number>;
    editTask(id: number, toppings: string): Task<number>;
    editTask(id: number, precio: number): Task<number>;
    editTask(id:number, precio:number, pizza:string, status:string, tamanio:string, toppings:string): Task<number>;
    editTask(
        id: unknown, pizza: unknown, status:unknown, tamanio:unknown, toppings:unknown, precio: unknown)
        : import("./task").Task<number> {
        throw new Error("Method not implemented.");
    }
}
