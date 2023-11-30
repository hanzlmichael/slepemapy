const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Test = require('../models/Test');
const Result = require('../models/Result') ;

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('token verify - ', process.env.JWT_SECRET_KEY)
  res.locals.author = true;
  //res.locals.author = null;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};


const checkAuthor = async (req, res, next) => {
  let testId = req.url.substring(1, req.url.length)
  if (testId.length > 24) {
    testId = testId.slice(0,24)
  }
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.author = null;
        next();
      } else {
        let user, teacherRef;
        await Promise.all([
          User.findById(decodedToken.id).select("_id").exec(),
          Test.findById(testId).select("teacherRef").exec()
        ])
          .then(([userDoc, testDoc]) => {
            user = userDoc._id.toString();
            teacherRef = testDoc.teacherRef.toString();
          })
          .catch((err) => {
            console.log(err);
          });

        if (user == teacherRef) {
          res.locals.author = user;
        } else {
          res.redirect('/tests')
        }
        next();
      }
    });
  } else {
    res.redirect('/tests')
    next();
  }
}

const isAuthor = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.isAuthor = null;
        next();
      } else {
        const url = req.url;
        const parts = url.split('/');
        const resultId = parts[parts.length - 1];
        let testRef;
        let authorId;
        try {
          testRef = await Result.findById(resultId).select("testRef");
        } catch(err) {
          console.log(err)
        }
        try {
          if (testRef) {
            authorId = await Test.findById(testRef.testRef).select("teacherRef");
          } else {
            next();
            return;
          }
        } catch(err) {
          console.log(err)
        }
        if (authorId.teacherRef.toString() === decodedToken.id) {
          res.locals.isAuthor = true;
        } else {
          res.locals.isAuthor = null;
        }
        next();
      }
    })
  } else {
    res.locals.isAuthor = null;
    next();
  }
}


const isAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.redirect("/");
    } else {
      const user = await User.findById(decodedToken.id);
      if (user) {
        const isAdmin = user.isAdmin;
        if (isAdmin) {
          next();
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }
    }
  });
};

const checkAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      res.locals.admin = null;
      next();
    } else {
      const user = await User.findById(decodedToken.id);
      if (user) {
        const isAdmin = user.isAdmin;
        if (isAdmin) {
          res.locals.admin = true;
          next();
        } else {
          res.locals.admin = null;
          next();
        }
      } else {
        res.locals.admin = null;
        next();
      }
    }
  });
};

module.exports = { checkUser, requireAuth, checkAuthor, isAdmin, isAuthor, checkAdmin};