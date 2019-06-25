/* created by kueiapp.com */
/* service started fom app.js */

// ES6
import setting from './config/setting.js';

// ES5
const express = require('express');
const bodyParser = require('body-parser');

// Express
const app = express();
app.use(express.static(__dirname + '/static')); // static path

// create application/json parser to support json encoded bodies
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }) ) // false:string, true:all types

const port = process.env.PORT || setting.config.port;

/** node.js main **/
app.listen(port, function() {
  console.log("Listening on ",port);
});

/* GET home page. */
// related to /api
app.get('/', (req, res) => {
  res.send(`on http://127.0.0.1:${setting.config.port} (${setting.config.env})`);
});

import API_ROUTE from './routes/api.route.js';
app.use('/api', API_ROUTE);


// export default app;
module.exports = app;
