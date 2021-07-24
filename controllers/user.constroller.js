const {response} = require('express');

const usuariosGET = (req, res = response) => {// recuperan datos
        
          const {nombre = 'anonymous',cel = undefined} = req.query;//recibe parametros del query
           
          res.send({
             msg: "GET-API -controller",
             nombre,
             cel
           });
           
         }
const usuariosPUT = (req, res = response) => {//para actualizar
    const {id} = req.params ; 
    res.status(200).send({
      msg: "PUT-API -controller",
      id
    });
  }
const usuariosPOST =(req, res = response) => {//crear nuevos recursos
    const {nombre , edad} = req.body;//recibinedo lo que mando el usuario
  
    res.send({
      msg: "POST-API -controller",
      nombre,
      edad
    });
  }

  const usuariosPATCH=(req, res=response) => {
    //aplica modificaciones parciales a un recurso
    res.send({
      msg: "PATCH-API -controller",
    });
  }

  const usuariosDELETE = (req, res = response) => {
    // borra un recurso especifico
    res.send({
      msg: "DELETE-API - constroller",
    });
  }
  
  module.exports = {
      usuariosGET,
      usuariosPUT,
      usuariosPOST,
      usuariosPATCH,
      usuariosDELETE

  }       

