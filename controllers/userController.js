const User = require("../models/User");
const mongoose = require('mongoose');

module.exports.getUsers = async (req, res) => {
  console.log('yes')
  try {
    const results = await User.find({});
    console.log(results);
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
