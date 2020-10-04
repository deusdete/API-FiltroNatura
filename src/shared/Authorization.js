const auth = require('../auth')
const Authorization = (req, res, next) => {
  req.user = {}
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    token = req.headers.authorization.split('Bearer ')[1];
  }else{
    return res.status(404).json({error: 'Não Autorizado'});
  }
  try {
    const decodeToken = auth.verify(token);
    //Modifique para pegar os paramentos desejados
    req.useId = decodeToken.id;
    return next()
  } catch (err) {
    console.error(err)
    return res.status(403).json(err)
  }
}

module.exports =  Authorization;