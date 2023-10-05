const Test = require("../models/Test");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/* module.exports.getTests = async (req, res) => {
  let token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      let teacherRef = decodedToken.id;
      console.log('teacherRef ', teacherRef)
      let tests = await Test.find({ teacherRef: new mongoose.Types.ObjectId(`${teacherRef}`)}).sort({ createdAt: -1});
      res.render('dashboard', { tests })      
    }
  });
} */

/* fetch version /tests  */
module.exports.getTests = async (req, res) => {
  let token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Chyba při načítání testů' });
    } else {
      let teacherRef = decodedToken.id;
      console.log('teacherRef ', teacherRef)
      let tests = await Test.find({ teacherRef: new mongoose.Types.ObjectId(`${teacherRef}`)}).sort({ createdAt: -1});
      res.render('dashboard', { tests });  
    }
  });
}

module.exports.getTestById = async (req, res) => {
  console.log('yy')
  let testId = req.params.testId;
  console.log('here')
  try {
    const test = await Test.findById(testId);
    if (test) {
      console.log('foundTest: ', testId)
      console.log(test)
      res.render('new', { test });
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.getTestByIdTest = async (req, res) => {
  let testId = req.params.testId;
  try {
    const test = await Test.findById(testId);
    if (test) {
      res.json({ test });
    }
  }
  catch(err) {
    console.log(err)
  }
}


module.exports.postTest = async (req, res) => {
  const { title, maps, questions, marksBoundaries, timeLimit } = req.body;

  const token = req.cookies.jwt;

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      // Handle token verification error
      res.sendStatus(403);
    } else {
      let teacherRef = decodedToken.id;
      try {
        const createdTest = await Test.create({ teacherRef, title, maps, questions, marksBoundaries, timeLimit})
        if (createdTest) {
          console.log('createdTest: ', createdTest)
          res.redirect('/tests');
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  });  
}


module.exports.deleteTest = async (req, res) => {
  let testId = req.params.testId;
  console.log('testId', testId)

  try {
    const test = await Test.findByIdAndRemove(testId);
    if (test) {
      console.log('deletedTest: ', testId)
      res.redirect('/tests');
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.getNewTest = (req, res) => {
  let test = false;
  res.render('new', { test })
}

module.exports.publishTest = async (req, res) => {
  try {
    let testId = req.params.testId;
    const test = await Test.findByIdAndUpdate(testId, { isActive: true });
    if (test) {
      res.redirect(204, '/tests');
    }
    /* res.status(204).json({message: 'Test uspesne aktualizovan.', refresh: true}); */
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}