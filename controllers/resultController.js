const Result = require("../models/Result");
const Test = require("../models/Test");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.postResult = async (req, res) => {
  const { testRef, firstName, lastName, email, answersIndexes, mark, points } = req.body;
  try {
    const result = await Result.create({ testRef, firstName, lastName, email, answersIndexes, mark, points});
    if (result) {
      res.status(201).json({ _id: result._id, message: 'Vysledek uspesne vytvoren' }); // Vracíme _id záznamu
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Vytvoreni vysledku selhalo' });
  }
}

module.exports.getResult = async (req, res) => {
  const resultId = req.params.resultId;
  try {
    const result = await Result.findById(resultId);
    const test = await Test.findById(result.testRef);
    const data = { result: result, test: test};
    res.render('result', { data });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports.deleteResult = async (req, res) => {
  const resultId = req.params.resultId;
  try {
    const result = await Result.findByIdAndRemove(resultId);
    if (result) {
      res.status(200).json({ message: 'Dokument byl uspesne smazan' });
    } else {
      res.status(404).json({ message: 'Dokument nebyl nalezen' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Nastala chyba při mazání dokumentu' });
  }
}


module.exports.updateResult = async (req, res) => {
  const { newMarkValue, newPointsValue } = req.body;
  const resultId = req.params.resultId;
  
  const token = req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const updatedResult = await Result.findByIdAndUpdate(resultId, { mark:newMarkValue, points: newPointsValue}, {
          new: true, 
          runValidators: true, 
        });
        if (updatedResult) {
          res.status(200).json(updatedResult);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  });  
}