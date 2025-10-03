import express from 'express';
import cors from 'cors';
import taskRoute from './routes/task.routes'


class Server{
  public app: express.Application;
  public port: number;

  constructor(port:number){
    this.port = port;
    this.app = express()
    this.middlewares()
    this.routes();
  }
  middlewares(){
    this.app.use(express.json({limit:'150mb'}))

    //corse
    this.app.use(cors())
  }
  routes(){
    this.app.use("/tasks", taskRoute);
  }

  start(callbaack:()=>void){
    this.app.listen(this.port, callbaack)
  }

}

export default Server