const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const tf = require('@tensorflow/tfjs');
const fs = require('fs').promises;
const PORT = 5000;
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/predict', async (req, res) => {
  const modelPath = process.env.MODEL_PATH;

  try {
    res.status(200).json({ success: true, modelPath });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Model path is wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
