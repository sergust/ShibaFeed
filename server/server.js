const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');

const app = express();

// Confing env variables
dotenv.config({ path: './config/config.env' });

// Body parser
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: 'Kek lol'
  });
});

// Mount routers
app.use('/api/v1/posts', posts);

app.use(errorHandler);

const PORT = process.env.PORT | 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
