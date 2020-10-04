const Filter = require('../models/Filter');
require('dotenv').config();

module.exports = {
  async getFilters (req, res) {
    try {

      const filters = await Filter.find({})

      return res.status(200).json({filters})
    } catch (error) {
      return res.status(400).json({ error: "Falha ao criar filtro" })
    }
  },

  async getFilter (req, res) {
    try {
      const filter = await Filter.findById(req.params.idFilter)
      return res.status(200).json({filter})
    } catch (error) {
      return res.status(400).json({ error: "Filtro não encontrado" })
    }
  },
  async registerFilter (req, res) {
    const { title } = req.body
 
    try {
      if(await Filter.findOne({title})){
        return res.status(400).json({error: 'Filtro já existe'});
      }

      const filter = await Filter.create(req.body);

      return res.status(200).json({filter})
    } catch (error) {
      return res.status(400).json({ error: "Falha ao criar filtro" })
    }
  },
}