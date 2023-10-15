const Result = require("../models/Result");
const Test = require("../models/Test");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.postResult = async (req, res) => {
  const { testRef, firstName, lastName, email, answersIndexes, mark, points } = req.body;
  console.log('posREsult')
  try {
    const result = await Result.create({ testRef, firstName, lastName, email, answersIndexes, mark, points});
    if (result) {
      res.status(201).json({ _id: result._id, message: 'Result created successfully' }); // Vracíme _id záznamu
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create result' });
  }
}

module.exports.getResultById = async (req, res) => {

  const resultId = req.params.resultId;
  console.log('reusltId: ', resultId);
  try {
    const result = await Result.findById(resultId);
    console.log('result.testREf: ', result.testRef);
    const test = await Test.findById(result.testRef);
    console.log('test: ', test)
    const data = { result: result, test: test};
    console.log('data ', data)
    res.render('result', { data });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports.deleteResultById = async (req, res) => {
  const resultId = req.params.resultId;
  try {
    const result = await Result.findByIdAndRemove(resultId);
    if (result) {
      res.status(200).json({ message: 'Dokument byl úspěšně smazán' });
    } else {
      res.status(404).json({ message: 'Dokument nebyl nalezen' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Nastala chyba při mazání dokumentu' });
  }
}