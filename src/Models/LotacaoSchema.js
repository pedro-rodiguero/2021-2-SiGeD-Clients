const mongoose = require('mongoose');

const lotacaoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['ativado','desativado'],
    require: [true],
    default: 'ativado',
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('Lotacao', lotacaoSchema);
