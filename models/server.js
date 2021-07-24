const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutPath = '/api/usuarios';// ruta de consulta de la api
    //middlewares
    this.middlewares();
    // routas de la app
    this.routs();
  }

  middlewares() {
    //cors
    this.app.use(cors());// esto es importante colocarlo 
    
    //directorio publico, .use me dice que es middleware, ejecuta el index.html de la capeta public, estamos sirviendo un archivo
    this.app.use(express.static("public"));

    //lectura y parseo del body
    this.app.use(express.json());//para serializar informacion entrante a json 
  }

  routs() {
    
    //utiliazar las rutas o endpoints que estan en otro archivo 
    this.app.use(this.usuariosRoutPath,require('../routes/user'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server corriendo en ", process.env.PORT);
    });
  }
}

module.exports = {
  Server,
};
