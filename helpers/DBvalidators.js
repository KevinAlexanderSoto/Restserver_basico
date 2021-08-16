const { Error } = require("mongoose");
const role = require("../models/role.js");
const Usuario = require("../models/usuario.model.js");

const rolvalidate = async (rol = "") => {
  const existRol = await role.findOne({ rol });
  if (!existRol) {
    throw new Error("El rol no esta registrado en la DB");
  }
};

const DBexistEmail = async (correo)=>{
  //varificar si el correo existe
  const emailExist = await Usuario.findOne({ correo });
  if (emailExist) {
    throw new Error('el correo ya existe ');
  }
};

const DBexistUsuario = async (id)=>{
  //varificar si el correo existe
  const userExist = await Usuario.findById(id);
    if (userExist) {
    throw new Error(`el ID:  ${id}  ya existe`);
  }
};


const existeUsuarioPorId = async( id ) => {
 // Verificar si el correo existe
 
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
      throw new Error(`El id no existe ${ id }`);
  }
}

module.exports = {
  rolvalidate,
  DBexistEmail,
  DBexistUsuario,
  existeUsuarioPorId
};
