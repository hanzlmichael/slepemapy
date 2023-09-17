const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { checkUser } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express()
const PORT =  process.env.PORT || 3213;

// view engine 
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'));
app.use(express.json({ limit: '15mb'}));
app.use(cookieParser());
app.use(cors());

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
})

app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
app.use('/tests', testRoutes);
app.use(authRoutes);