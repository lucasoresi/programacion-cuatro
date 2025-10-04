import { Request, Response } from "express";
import TasksService from "@/services/tasks.service";
import { Task } from "@/models/task/task";

class TaskController{
    // GET /tasks/:id
    public getTask(req: Request, res: Response){
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                message: "id no definido"
            });
        }
        
        try{
            const task = TasksService.getTask(id);
            return res.status(200).json(task);
        }catch(error){
            if(error instanceof Error){
                return res.status(404).json({
                    message: error.message
                });
            }
        }
    }

    // GET /tasks /tasks?status
    public getTasks(req: Request, res: Response){
        const status = req.query.status as string;
        
        if (status) {
            const tareasFiltradas = TasksService.getTasksByStatus(status);
            return res.status(200).json(tareasFiltradas);
        }
        
        const tareas = TasksService.getTasks();
        return res.status(200).json(tareas);
    }
    
    // POST /tasks
    public addTask(req: Request, res: Response){
        const {pizza, tamanio, status, toppings} = req.body;
        
 
        if (!pizza || !tamanio || !status) {
            return res.status(422).json({
                message: "Faltan campos requeridos: pizza, tamanio, status"
            });
        }
        

        if (!Task.isValidSize(tamanio)) {
            return res.status(422).json({
                message: "Tamaño inválido. Debe ser S, M o L"
            });
        }
        

        if (!Task.isValidToppingsCount(toppings || "")) {
            return res.status(422).json({
                message: "Máximo 5 toppings permitidos"
            });
        }
        

        const precio = Task.calculatePrice(tamanio, toppings || "");
        
        const nuevaTarea = new Task(pizza, tamanio, status, toppings || "", precio);
        TasksService.addTask(nuevaTarea);
        
        return res.status(201).json(nuevaTarea);
    }
    
    // POST /tasks/:id/cancel
    public cancelTask(req: Request, res: Response){
        const id = req.params.id;
        
        if(!id){
            return res.status(400).json({
                message: "id no definido"
            });
        }
        
        try{
            const taskCancelada = TasksService.cancelTask(id);
            return res.status(200).json({
                message: "Tarea cancelada exitosamente",
                task: taskCancelada
            });
        }catch(error){
            if(error instanceof Error){

                if(error.message.includes("entregado")){
                    return res.status(409).json({
                        message: error.message
                    });
                }
                return res.status(404).json({
                    message: error.message
                });
            }
        }
    }
}

export default new TaskController();