import { Task } from "../task";

export interface TaskCrude{
    getTasks(): Array<Task>;
    getTask(id: string): Task;
    addTask(pizza: Task): void;
    deleteTask(id:string): void;
    editPizza(id: string, pizza: string): Task;
    editStatus(id: string, status: string): Task;
    editTamanio(id: string, tamanio: string): Task;
    editToppings(id: string, toppings: string): Task;
    editPrecio(id: string, precio: number): Task;
    editTask(id: string, pizza: string, status: string, tamanio: string, toppings: string, precio: number): Task;
    size(): number;
}