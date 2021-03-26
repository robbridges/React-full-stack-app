'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize, Users, Courses, } = require('./models');
const router = require('./routes');
const cors = require('cors');
const apiRouter = require('./routes/api');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
// this is what gives our requests the ability to use the .json response without parsing the body
app.use(express.json());

//enable cors
app.use(cors());

// routes that we created for the app
app.use('/', router);
app.use('/api', apiRouter);

(async ()=> {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('You are connected to the database.');
  } catch (error) {
    console.error('Uht oh, we could not connect:', error);
  }

})();

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
