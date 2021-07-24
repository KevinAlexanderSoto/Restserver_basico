const { Router } = require("express");
const {
  usuariosGET,
  usuariosPUT,
  usuariosPOST,
  usuariosPATCH,
  usuariosDELETE,
} = require("../controllers/user.constroller.js");

const router = Router();

router.get("/", usuariosGET);

router.put("/:id", usuariosPUT);//se configura el parametro de segmento en la ruta, express me lo estrega en una variable 

router.post("/", usuariosPOST);

router.patch("/", usuariosPATCH);

router.delete("/", usuariosDELETE);

module.exports = router;
