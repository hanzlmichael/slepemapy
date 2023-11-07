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

  // check json web token exists & is verified
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
  console.log('dostal se sem')
  let testId = req.url.substring(1, req.url.length)
  console.log('testId ', testId)
  if (testId.length > 24) {
    testId = testId.slice(0,24)
    console.log('sliced ', testId)
  }

  // check if user has a valid token
  console.log('dostal se sem1')
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log('err1')
        res.locals.author = null;
        next();
      } else {
        let user, teacherRef;

        console.log('decodedid ', decodedToken.id);
        // use Promise.all() to wait for both queries to complete
        await Promise.all([
          User.findById(decodedToken.id).select("_id").exec(),
          Test.findById(testId).select("teacherRef").exec()
        ])
          .then(([userDoc, testDoc]) => {
            console.log('err2')
            user = userDoc._id.toString();
            teacherRef = testDoc.teacherRef.toString();
            console.log('srovnani ', user, teacherRef)
          })
          .catch((err) => {
            console.log('err3')
            console.log(err);
          });

        if (user == teacherRef) {
          console.log('--------------------------------', user)

          res.locals.author = user;
        } else {
          console.log('err4')
          //res.locals.author = null;
          res.redirect('/tests')
        }

        next();
      }
    });
  } else {
    //res.locals.author = null;
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
          console.log('HERE - testRef: ', testRef)
        } catch(err) {
          console.log(err)
        }
        try {
          console.log('testRef in HERE : ', testRef.testRef)
          authorId = await Test.findById(testRef.testRef).select("teacherRef");
          console.log('HERE - authorId: ', authorId.teacherRef)
        } catch(err) {
          console.log(err)
        }
        console.log('authorId.teacherRef === decodedToken.id', authorId.teacherRef, decodedToken.id);

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
          console.log("Nedostatečná autorizace");
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }
    }
  });
};



module.exports = { checkUser, requireAuth, checkAuthor, isAdmin, isAuthor};