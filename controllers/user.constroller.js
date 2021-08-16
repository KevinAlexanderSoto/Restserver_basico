const { response } = require("express");
const Usuario = require("../models/usuario.model.js"); //modelo de la DB
const bcrypt = require("bcryptjs"); //Encriptar contraseña


const usuariosGET = async (req, res = response) => {// recuperan datos
  
  /* const { nombre = "anonymous", cel = undefined } = req.query; //recibe parametros del query */
 

  const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
      ////////////////SABER CUANTOS REGISTROS TENGO //////////////////
        Usuario.countDocuments(query),
      /////////////// PAGINACION //////////////////////////
        Usuario.find(query)// trae todos los usuarios
            .skip( Number( desde ) )// se salta los x primeros registros 
            .limit(Number( limite ))//para obtener los x primeros registros 
    ]);
  
  res.send({
    total,
    usuarios
  });
};
const usuariosPUT = async (req, res = response) => {//para actualizar
  
  const { id } = req.params; // los que se mandan por debajo en URL

  const {_id,password,google,...resto} = req.body;

  if (password) {
    //encriptar la contraseña 
    const salt = bcrypt.genSaltSync(); 
    resto.password = bcrypt.hashSync(password, salt); //encripta la contraseña

  }
  //actualizar los dtos en la DB 
  const actuUser = await Usuario.findByIdAndUpdate(id, resto);


  res.status(200).send({
    actuUser,
  });
};

const usuariosPOST = async (req, res = response) => {//crear nuevos recursos
  
  const { nombre, correo, password, role } = req.body; //recibinedo lo que mando el usuario

  const usuario = new Usuario({ nombre, correo, password, role }); // el campo que no este definido en el modelo no se guardara

  //encriptar contraseña
  const salt = bcrypt.genSaltSync(); //por defecto lo genera de 10 vueltas

  usuario.password = bcrypt.hashSync(password, salt); //encripta la contraseña

  //Guardar DB

  await usuario.save(); // guardar la INFO en DB

  res.send({
    msg: "POST-API -controller",
    usuario,
  });

};

const usuariosPATCH = (req, res = response) => {
  //aplica modificaciones parciales a un recurso
  res.send({
    msg: "PATCH-API -controller",
  });
};

const usuariosDELETE = (req, res = response) => {// borra un recurso especifico
  
  const {id} = req.params;
/* 
para borrar fisicamente de la DB 
const trulyDeleted = Usuario.findByIdAndDeleted(id);

*/
  const deleted = Usuario.findByIdAndUpdate(id,{state : false});// asi se mantiene la integridad referencial

  res.send({
    deleted
  });
};

module.exports = {
  usuariosGET,
  usuariosPUT,
  usuariosPOST,
  usuariosPATCH,
  usuariosDELETE,
};
