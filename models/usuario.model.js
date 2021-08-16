const { Schema , model} = require('mongoose');


//creamos el modelo de los datos de la DB 
const UsuarioSchema = Schema({
    nombre : {
        type : String,
        require:[true,'nombre obligatorio']
    },
    correo : {
        type : String,
        require:[true,'correo obligatorio']
    },
    password : {
        type : String,
        require:[true,'password obligatorio']
    },
    img : {
        type : String,
        
    },
    role : {
        type : String,
        require:true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    state : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }

});

UsuarioSchema.methods.toJSON = function (){//sobreescribe un metodo de mongoose
    //saca la contraseña , para no devolverla 
    const {__v , password,...user}= this.toObject();

    return user;
}


module.exports = model('Usuario',UsuarioSchema);//asi se ecporta el modelo 