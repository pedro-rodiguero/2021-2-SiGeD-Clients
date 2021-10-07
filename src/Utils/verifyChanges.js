const moment = require('moment-timezone');
const Client = require('../Models/ClientSchema');

const buildHistory = (body, client, label) => {
  const date = moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate();
  return {
    label,
    before: client[label],
    after: body[label],
    userID: body.userID,
    date,
  };
};

const verifyChanges = async (body, id) => {
  const client = await Client.findOne({ _id: id });  
  const newHistory = [];

  Object.keys(body).map((key) => {
    if (body[key] !== client[key]) {
      newHistory.push(buildHistory(body, client, key));
    }
  });

  return [...client.history, ...newHistory];
};

module.exports = verifyChanges;
