const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  teacherRef: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: [true, 'Chybí název testu']
  },
  categories: [],
  maps: [],
  test: {},
  marksBoundaries: [],
  timeLimit: String,
  isActive: {
    type: Boolean,
    default: false
  },
  completeUntil: Date,
  password: String
}, { timestamps: true });

const Test = mongoose.model('test', testSchema);

module.exports = Test