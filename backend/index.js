const express = require('express');
const session = require('express-session');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use('/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}`));
