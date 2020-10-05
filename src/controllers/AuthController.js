const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
require('dotenv').config();

module.exports = {
  async register (req, res) {
    const { email } = req.body;
    console.log(email);
    try {
      if(await User.findOne({email})){
        return res.status(400).json({error: 'Usuário já existe'});
      }

      const user = await User.create(req.body);

      user.password = undefined;

      const token = auth.sign({id: user._id});

      return res.status(200).json({user, token})
    } catch (error) {
      return res.status(400).json({ error: "Falha ao registrar" })
    }

  },

  async login (req, res) {
    const { email, password } = req.body;
    
    const user = await User.findOne({email}).select('+password');
    if(!user){
      return res.status(400).json({error: 'Usuário não encontrado'})
    }

    if(!await bcrypt.compare(password, user.password)){
      return res.status(400).json({password: 'Senha incorreta'})
    }

    user.password = undefined;

    const token = auth.sign({id: user._id});

    return res.status(200).json({user, token})
  }
}