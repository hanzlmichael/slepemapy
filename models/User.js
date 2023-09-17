const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Zadejte email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: 'Zadejte platný email'
    }
  },
  password: {
    type: String,
    required: [true, 'Zadejte heslo'],
    minlength: [6, 'Minimální délka hesla je 6 znaků'],
  }
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User