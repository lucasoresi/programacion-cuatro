import { Task } from "../task";

export interface TaskCrude<ID>{
    getTasks(): Task<ID>;
    getTask(id: ID): Task<ID>;
    addTask(pizza: Task<ID>): void;
    deleteTask(id: ID): void;
    editTask(id: ID, pizza: string): Task<ID>;
    editTask(id: ID, status: string): Task<ID>;
    editTask(id: ID, tamanio: string): Task<ID>;
    editTask(id: ID, toppings: string): Task<ID>;
    editTask(id: ID, precio: number): Task<ID>;
    editTask(id: ID, pizza: string, status: string, tamanio: string, toppings: string, precio: number): Task<ID>;
}