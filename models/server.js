import express from "express";
import Cors from "cors";
import { DBConnection } from "../db/config.js";


import userRoutes from "../routes/user.js";
import roleRoutes  from "../routes/role.js";
import courseRoutes  from "../routes/course.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.userPath = "/user";
    this.rolePath = "/role";
    this.coursePath = "/course";

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }
  async conectarDB() {
    //conecta con db
    await DBConnection();
  }

  middlewares() {
    //Cors
    this.app.use(Cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.rolePath, roleRoutes);
    this.app.use(this.coursePath, courseRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en localhost ${this.port}`);
    });
  }
}
