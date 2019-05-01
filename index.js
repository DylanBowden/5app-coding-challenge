const express = require('express');
const bodyParser = require('body-parser');

const validator = require('./src/requestValidator');
const dataModifier = require('./src/dataModifier');

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    validator.validateBody(req);
    const response = dataModifier(req.body.payload);
    res.json({ response });
  } catch (err) {
    res.sendStatus(400);
  }
});

const server = app.listen(port, () => console.log(`listening on port ${port}!`));

module.exports = {
  app,
  server
};
