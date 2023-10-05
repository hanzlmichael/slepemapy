const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  teacherRef: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: [true, 'Chybí název testu']
  },
  maps: [],
  questions: [],
  marksBoundaries: [],
  timeLimit: String,
  isActive: {
    type: Boolean,
    default: false
  },
  completeUntil: Date,
  accesCode: String
}, { timestamps: true });

const Test = mongoose.model('test', testSchema);

module.exports = Test