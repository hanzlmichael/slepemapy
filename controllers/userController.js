const User = require("../models/User");
const mongoose = require('mongoose');

module.exports.getUsers = async (req, res) => {
  try {
    const results = await User.find({});
    if (results) {
      res.json({results});
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (user) {
      res.status(200).json({ message: 'Uživatel byl úspěšně smazán' });
    } else {
      res.status(404).json({ message: 'Uživatel nebyl nalezen' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Nastala chyba při mazání uživatele' });
  }
}

module.exports.getUserByEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.find({email: email});
    if (user) {
      res.json(user);
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.getUsersCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    res.json({ userCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getAllUsers = async (req, res) => {
  const { position, count } = req.query;
  try {
    const users = await User.find().skip(parseInt(position)).limit(parseInt(count)).select('email isAdmin');
    if (users) {
      res.json({users});
    }
  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: 'Chyba při získávání uživatelů' });
  }
}