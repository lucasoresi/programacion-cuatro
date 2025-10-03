import { Router } from "express";
import TaskController from "@/controllers/task.controller";

const taskRouter = Router()

taskRouter.get("/", TaskController.getTasks)
taskRouter.post("/", TaskController.addTask)

export default taskRouter;

