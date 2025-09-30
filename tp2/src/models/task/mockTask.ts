import { TaskCrude } from "./interface/taskCrude.interface";
import { Task } from "./task";

export class MockTask implements TaskCrude{
    protected tam:number;
    protected container: Array<Task>;
    constructor(){
        this.tam = 0;
        this.container = new Array<Task>();
    }
    size(): number {
        return this.tam;
    }
    getTasks(): Array<Task> {
        return this.container;
    }
    addTask(pizza: Task): void {
        this.container.push(pizza);
        this.tam++;
    }
    getTask(id: string): Task {
            const resultado = this.container.find((pizza:Task) => {
            return pizza.getId() === id;
        });
        if(resultado === undefined){
            throw new Error("No se encontro la pizza");
        }
        return resultado;
    }
    deleteTask(id: string): void {
        throw new Error("Method not implemented.");
    }
    editPizza(id: string, pizza: string): Task {
        const tareaEncontrar = this.container.find((tarea: Task) => tarea.getId() === id);
        if(!tareaEncontrar){
            throw new Error("No se encontro la pizza");
        }
        tareaEncontrar.setPizza(pizza);
        return tareaEncontrar;
    }
    editStatus(id: string, status: string): Task {
        const tareaEncontrar = this.container.find((tarea: Task) => tarea.getId() === id);
        if(!tareaEncontrar){
            throw new Error("No se encontro la pizza");
        }
        tareaEncontrar.setStatus(status);
        return tareaEncontrar;
    }
    editTamanio(id: string, tamanio: string): Task {
        const tareaEncontrar = this.container.find((tarea: Task) => tarea.getId() === id);
        if(!tareaEncontrar){
            throw new Error("No se encontro la pizza");
        }
        tareaEncontrar.setTamanio(tamanio);
        return tareaEncontrar;
    } 
    editToppings(id: string, toppings: string): Task {
        const tareaEncontrar = this.container.find((tarea: Task) => tarea.getId() === id);
        if(!tareaEncontrar){
            throw new Error("No se encontro la pizza");
        }
        tareaEncontrar.setToppings(toppings);
        return tareaEncontrar;
    }  
    editPrecio(id: string, precio: number): Task {
        const tareaEncontrar = this.container.find((tarea: Task) => tarea.getId() === id);
        if(!tareaEncontrar){
            throw new Error("No se encontro la pizza");
        }
        tareaEncontrar.setPrecio(precio);
        return tareaEncontrar;
    }
    editTask(id: string, pizza: string, status: string, tamanio: string, toppings: string, precio: number): Task {
        throw new Error("Method not implemented.");
    }
}
