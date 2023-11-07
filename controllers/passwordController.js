const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

module.exports.forgotPassword = async (req, res) => {
  res.render('forgot-password');
}

module.exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log('req.hostnam ', req.hostname)

  try {
    const user = await User.findOne({email: email});
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const userId = user._id;
      console.log('userId resetToken', userId, token);

      const createdToken = await Token.create({ userId, token })
      if (createdToken) {
        console.log('here2');
        sendEmail(email, createdToken, req.hostname);
        console.log('here3');
        let message = {text:"Žádost o nové heslo odeslána.", success:true};
        res.status(200).json({message});
      } else {
        console.log('here4')
        let message = {text: "Žádost o nové heslo odeslána.", success:true};
        res.status(500).json({message});
      }

    } else {
      let message = {text: "Uživatel s tímto emailem neexistuje.", success:false};
      res.status(500).json({message});
    }
  } catch (error) {
    console.log(error)
    res.status(500);
  }
}

module.exports.getResetPassword = async (req, res) => {
  try {
    // zde ověřit existenci a platnost tokenu
    const { id, token } = req.query;
    if (id && token) {

    }
    const tokenFromDb = await Token.findById(id).select("token isActive");
   if (tokenFromDb) {
    if (token === tokenFromDb.token && tokenFromDb.isActive) {
      res.render('reset-password');
    } else {
      res.render('forgot-password');
    }
    } else {
      res.render('forgot-password');
    }
       
  } catch (err) {
    console.log(err);
  }
  
}

module.exports.postResetPassword = async (req, res) => {
  try {
    let tokentest = req.body.tokenId;
    console.log('tokentest ', tokentest);
    const { tokenId, password } = req.body;
    console.log('tokenId + passowrd', tokenId, password)
    const salt = await bcrypt.genSalt(10);
    const updatedPassword = await bcrypt.hash(password, salt);
    console.log('udpatedPassword ', updatedPassword);
    const userId = await Token.findById(tokenId).select("userId");
    console.log('userId', userId)
    await User.findByIdAndUpdate(userId, { password: updatedPassword });
    await Token.findByIdAndUpdate(tokenId, {isActive: false});
    res.json({ message: 'Heslo bylo úspěšně aktualizováno' });
  } catch (error) {
    res.status(500).json({ error: 'Něco se nepovedlo: ' + error.message });
  }
  
}