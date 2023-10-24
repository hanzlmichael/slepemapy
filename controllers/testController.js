const Test = require("../models/Test");
const User = require("../models/User");
const Result = require("../models/Result");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

module.exports.getAllTests = async (req, res) => {
  const { position, count } = req.query;
  try {
    /* const tests = await Test.find().skip(parseInt(position)).limit(parseInt(count)).select('email title');
    */ 
    /* const tests = await Test.findOne().select('teacherRef title');

    console.log(tests);

    User.populate('tests').exec(function (err, user) {
      if (err) return HandleError(err);
      console.log('The author is %s', user.tests.email);
      if (tests) {
        res.json({tests});
      }
    }) */

    const tests = await Test.find().populate('teacherRef', 'email').skip(parseInt(position)).limit(parseInt(count)).select('teacherRef title');
    if (tests) {
      res.json({tests});
    }
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: 'Chyba při získávání uživatelů' });
  }
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

  if (!title) {
    return res.status(400).json({ error: 'Chybí název testu' });
  }

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
        console.log('err here ', err.errors.title);
      }
    }
  });  
}

module.exports.updateTestById = async (req, res) => {
  const { title, maps, questions, timeLimit, marksBoundaries } = req.body;
  const testId = req.params.testId;
  
  const token = req.cookies.jwt;
  let teacherRef;

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      // Handle token verification error
      res.sendStatus(403);
    } else {
      let teacherRef = decodedToken.id;
      try {
        const updatedTest = await Test.findByIdAndUpdate(testId, {title, maps, questions, timeLimit, marksBoundaries }, {
          new: true, // returns the updated test instead of the original one
          runValidators: true, // validates the updated test against the schema
        });
        if (updatedTest) {
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

  try {
    const test = await Test.findByIdAndRemove(testId);
    if (test) {
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

module.exports.getExam = async (req, res) => {
  let testId = req.params.testId;
  try {
    const test = await Test.findById(testId);
    if (test) {
      res.render('exam', {test})
      /* res.json({ test }); */
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ testRef: req.params.testId });
    if (results) {
      res.render('results', { results })
    }
  }
  catch(err) {
    console.log(err)
  }
}
