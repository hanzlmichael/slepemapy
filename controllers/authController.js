const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.message === 'incorrect email') {
    errors.email = 'Email není registrován';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'Nesprávné heslo';
  }

  if (err.message === 'Hesla se neshodují') {
    errors.password = 'Hesla se neshodují';
  }

  if (err.code === 11000) {
    errors.email = 'Email je již registrován';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
};

module.exports.getRegister = (req, res) => {
  res.render('register');
}

module.exports.getLogin = (req, res) => {
  res.render('login');
}

module.exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

   try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    } 
}

module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });    
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  } 
}

module.exports.getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}