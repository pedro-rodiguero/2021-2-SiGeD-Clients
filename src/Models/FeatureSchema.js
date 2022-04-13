const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  color: {
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

module.exports = mongoose.model('Feature', featureSchema);
