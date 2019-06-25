// post test
// express and body-parser are needed to be installed first

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());

app.listen(8888, function() {
  console.log("Listening on 8888");
});

app.post('/comments', (req, res) => {
    console.log(req.body); // raw:json
})
