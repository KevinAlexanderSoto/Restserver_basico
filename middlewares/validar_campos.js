const { validationResult } = require("express-validator");

const validar = ( req, res, next )=>{
    const errorValitation = validationResult(req);

    if( !errorValitation.isEmpty()){
      return res.status(400).send(errorValitation);
    }

    next();// el next es propio del middleware, permite que siga con el proximo middleware
}


module.exports = {validar}