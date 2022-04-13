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
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
  },
  active:{
    type: Boolean,
    require: true,
    default: true,
  }
});

module.exports = mongoose.model('Lotacao', lotacaoSchema);
