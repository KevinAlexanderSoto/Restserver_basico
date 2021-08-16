const { Router } = require("express");
const { check } = require("express-validator");
const { Error } = require("mongoose");
const {
  usuariosGET,
  usuariosPUT,
  usuariosPOST,
  usuariosPATCH,
  usuariosDELETE,
} = require("../controllers/user.constroller.js");

const { rolvalidate, DBexistEmail, DBexistUsuario,existeUsuarioPorId } = require("../helpers/DBvalidators.js");
const { validar } = require("../middlewares/validar_campos.js");

const router = Router();

router.get("/", [
  check('limit','no es un numero').isNumeric(),
  check('desde','no es un numero').isNumeric(),
  validar
],usuariosGET);

router.put("/:id",[
  //el check tambien toma segmentos, tambien toma parametros
  check('id','No es un ID valido').isMongoId(),
  check("id").custom(DBexistUsuario),
  check("role").custom((rol) => rolvalidate(rol)),
  validar
],
 usuariosPUT); //se configura el parametro de segmento en la ruta, express me lo estrega en una variable

router.post(
  "/",
  check("correo", "Correo no VALIDO ").isEmail(),
  check("correo").custom(DBexistEmail), // valida si el correo existe
  check("password", "Contraseñas Mas de 6 letras ").isLength(6),
  /* check('role','ROL no valido ').isIn(['ADMIN_ROLE','USER_ROLE']) se validara conta la base de datos */

  check("role").custom((rol) => rolvalidate(rol)),
  check("nombre", "Debe ingresar un nombre ").not().isEmpty(),
  validar, //middelware propio

  usuariosPOST
);

router.patch("/", usuariosPATCH);

router.delete("/", [ 
  check('id', 'No es un ID válido').isMongoId(),
check('id').custom( existeUsuarioPorId ),
validarCampos],usuariosDELETE);

module.exports = router;
