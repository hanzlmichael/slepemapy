const Result = require("../models/Result");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.postResult = async (req, res) => {
  const { testRef, firstName, lastName, email, answersIndexes, mark, points } = req.body;

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

module.exports.getResult = async (req, res) => {
  try {
    res.render('result');
  }
  catch (err) {
    console.log(err);
  }


}