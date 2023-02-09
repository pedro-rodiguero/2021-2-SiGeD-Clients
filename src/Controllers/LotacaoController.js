const moment = require('moment-timezone');
const Lotacao = require('../Models/LotacaoSchema');

class LotacaoService {
  constructor() {
    this.timezone = 'America/Sao_Paulo';
  }

  async createLotacao(req, res) {
    const { name, description } = req.body;
    try {
      const date = this._getCurrentDate();
      const lotacao = await Lotacao.create({
        name,
        description,
        createdAt: date,
        updatedAt: date,
      });
      return res.json(lotacao);
    } catch (error) {
      return res.status(400).json({ message: error.keyValue });
    }
  }

  async getAllLotacoes(req, res) {
    const allLotacaoreq = await Lotacao.find();
    return res.json(allLotacaoreq);
  }

  async getLotacaoByActivate(req, res) {
    const allLotacaoreq = await Lotacao.find({ status: "ativado" });
    return res.json(allLotacaoreq);
  }

  async updateLotacao(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const lotacao = await Lotacao.findOneAndUpdate({ _id: id }, {
        name,
        description,
        updatedAt: this._getCurrentDate(),
      }, { new: true });
      return res.json(lotacao);
    } catch (error) {
      return res.status(400).json({ duplicated: error.keyValue });
    }
  }

  async deleteLotacao(req, res) {
    const { id } = req.params;
    try {
      await Lotacao.deleteOne({ _id: id });
      return res.status(200).json({ message: 'success' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
  }

  async deactivateLotacao(req, res) {
    const { id } = req.params;
    try {
      const updateStatus = await Lotacao.findOneAndUpdate({ _id: id }, {
        status: 'desativado',
        updatedAt: this._getCurrentDate(),
      }, { new: true }, (lotacao) => lotacao);
      return res.json(updateStatus);
    } catch {
      return res.status(400).json({ err: 'invalid id' });
    }
  }

  _getCurrentDate() {
    return moment.utc(moment.tz(this.timezone).format('YYYY-MM-DDTHH:mm:ss')).toDate();
  }
}

module.exports = new LotacaoService();
