require('dotenv').config();// recuerda crear archivo .env 

const {Server} = require('./models/server');

// montar servidor 

server = new Server;

server.listen();
 
