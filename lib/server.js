'use strict';
const router = require('../lib/routes');
const express = require('express');
const app = express();

const requestTime = (req, res, next) => {
  const timestamp = Date.now();
  req.requestTime = timestamp.toString();
  next();
};

app.use('/c', router);
app.use('/d', router);

app.use(requestTime);

app.use((req, res, next) => {
  console.log(
    `PATH: ${req._parsedUrl.path}\nMETHOD: ${req.method}\nREQUEST_TIME: ${
      req.requestTime
    }`
  );
  next();
});

app.use('/b', (req, res, next) => {
  const num = req.query.num;
  req.number = num * num;
  next();
});

app.get('/a', (req, res) => {
  res.status(200).send(req.requestTime);
});

app.get('/b', (req, res) => {
  res.status(200).send(req.number.toString());
});

app.use((req, res) => {
  res.status(404);
  res.send('That page was not found');
});

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

module.exports = {
  server: app,
  start: (port) => {
    let PORT = process.env.PORT || port || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
  },
};
