import { Router } from "express";
import TaskController from "@/controllers/task.controller";

const taskRouter = Router();

// GET /tasks o GET /tasks?status
taskRouter.get("/", TaskController.getTasks);

// POST /tasks
taskRouter.post("/", TaskController.addTask);

// GET /tasks/:id 
taskRouter.get("/:id", TaskController.getTask);

// POST /tasks/:id/cancel
taskRouter.post("/:id/cancel", TaskController.cancelTask);

export default taskRouter;