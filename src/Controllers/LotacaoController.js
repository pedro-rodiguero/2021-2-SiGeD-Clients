const moment = require('moment-timezone');
const Lotacao = require('../Models/LotacaoSchema');
const Client = require('../Models/ClientSchema');

const create = async (req, res) => {
  const {
    name, description,
  } = req.body;

  try {
    const date = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();
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
};

const allLotacao = async (req, res) => {
  const allLotacaoreq = await Lotacao.find();
  return res.json(allLotacaoreq);
};

const allOpenLotacao = async (req, res) => {
  const allLotacaoreq = await Lotacao.find({ active: true });
  return res.json(allLotacaoreq);
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, description,
  } = req.body;

  try {
    const lotacao = await Lotacao.findOneAndUpdate({ _id: id }, {
      name,
      description,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    },
    { new: true });
    return res.json(lotacao);
  } catch (error) {
    return res.status(400).json({ duplicated: error.keyValue });
  }
};

const deleteLotacao = async (req, res) => {
  try {
    const { id } = req.params;

    const lotacaoFound = await Lotacao.findOne({ _id: id });
    
    const clientFound = await Client.find({ active: true, location: lotacaoFound });

    console.log("dsadadas" + clientFound);

    if(clientFound.length > 0){
      startModal();
      return;
    }

    active = !lotacaoFound.active

    const updateReturn = await Lotacao.findOneAndUpdate(
      { _id: id },
      { active },
      { new: true },
      (err, lotacao) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.json(lotacao);
      },
    );
    return updateReturn;
  } catch (err) {
    return res.status(400).json({ message: 'Location not found' });
  }
};

module.exports = {
  create, allLotacao, allOpenLotacao, update, deleteLotacao,
};
