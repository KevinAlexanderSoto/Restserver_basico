require('dotenv').config();

const {Server} = require('./models/server');

// montar servidor 

server = new Server;

server.listen();
 
