const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const multer = require('multer');
connectDB = require('./config/db');

const app = express();

// Confing env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const posts = require('./routes/posts');

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/posts', posts);

app.use(errorHandler);

const PORT = process.env.PORT | 5000;

const server = app.listen(
  PORT,
  console.log(
    `⚙️ Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
  )
);
