const mongoose = require('mongoose');

const dbconnection = async()=>{
    try {
        await mongoose.connect(process.env.CONNECT_BD,{//URL de conecxion de la DB 
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify: true
        });
        console.log('Base de datos online ');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de Datos')
    }



}



module.exports= {
    dbconnection
}