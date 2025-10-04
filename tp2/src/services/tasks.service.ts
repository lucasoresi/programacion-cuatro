import { TaskCrude } from "@/models/task/interface/taskCrude.interface";
import { Task } from "@/models/task/task";
import TaskModel from "@/models/task/mockTask";

class TaskServices implements TaskCrude{
    getTasks(): Array<Task> {
        return TaskModel.getTasks();
    }
    
    getTasksByStatus(status: string): Array<Task> {
        return TaskModel.getTasksByStatus(status);
    }
    
    getTask(id: string): Task {
        return TaskModel.getTask(id);
    }
    
    addTask(pizza: Task): void {
        TaskModel.addTask(pizza);
    }
    
    cancelTask(id: string): Task {
        return TaskModel.cancelTask(id);
    }
    
    deleteTask(id: string): void {
        TaskModel.deleteTask(id);
    }
    editPizza(id: string, pizza: string): Task {
        return TaskModel.editPizza(id, pizza);
    }
    editStatus(id: string, status: string): Task {
        return TaskModel.editStatus(id, status);
    }
    editTamanio(id: string, tamanio: string): Task {
        return TaskModel.editTamanio(id, tamanio);
    }
    editToppings(id: string, toppings: string): Task {
        return TaskModel.editToppings(id, toppings);
    }
    editPrecio(id: string, precio: number): Task {
        return TaskModel.editPrecio(id, precio);
    }
    editTask(id: string, pizza: string, status: string, tamanio: string, toppings: string, precio: number): Task {
        return TaskModel.editTask(id, pizza, status, tamanio, toppings, precio);
    }
    size(): number {
        return TaskModel.size();
    }
}

export default new TaskServices();