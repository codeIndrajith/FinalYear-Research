const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const { createProxyMiddleware } = require('http-proxy-middleware');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const tf = require('@tensorflow/tfjs');
const fs = require('fs').promises;
const PORT = 5000;
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// DB connection
connectDB();

app.use('/api/v1/auth', userRoutes)

app.get('/predict', async (req, res) => {
  const modelPath = process.env.MODEL_PATH;

  try {
    res.status(200).json({ success: true, modelPath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Model path is wrong' });
  }
});

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
