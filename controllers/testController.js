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
      let tests = await Test.find({ teacherRef: new mongoose.Types.ObjectId(`${teacherRef}`)}).sort({ createdAt: -1});
      res.render('dashboard', { tests });  
    }
  });
}

module.exports.getAllTests = async (req, res) => {
  const { position, count } = req.query;
  try {
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
  let testId = req.params.testId;
  try {
    const test = await Test.findById(testId);
    if (test) {
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
      return res.json({ test });
    } else {
      return res.status(404).json({ error: 'Test not found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
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
      res.sendStatus(403);
    } else {
      let teacherRef = decodedToken.id;
      try {
        const createdTest = await Test.create({ teacherRef, title, maps, questions, marksBoundaries, timeLimit})
        if (createdTest) {
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

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const updatedTest = await Test.findByIdAndUpdate(testId, {title, maps, questions, timeLimit, marksBoundaries }, {
          new: true, 
          runValidators: true, 
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
      // smazat všechny resulty 
      const testIdObjectId = new mongoose.Types.ObjectId(testId);
      // Použijte testIdObjectId v deleteMany
      await Result.deleteMany({ testRef: testIdObjectId });
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

module.exports.getTestsCount = async (req, res) => {
  try {
    const testCount = await Test.countDocuments({});
    res.json({ testCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};