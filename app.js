const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { routes } = require('./src/routes');
const { globalErrorHandler } = require('./src/utils/Error');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(routes);
  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
