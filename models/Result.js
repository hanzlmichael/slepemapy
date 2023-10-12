const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  testRef: {
    type: mongoose.Schema.Types.ObjectId
  },
  firstName: {
    type: String,
    required: [true, 'Chybí křestní jméno']
  },
  lastName: {
    type: String,
    required: [true, 'Chybí příjmení']
  },
  email: String,
  answersIndexes: [],
  mark: String,
  points: String
});

const Result = mongoose.model('result', resultSchema);

module.exports = Result