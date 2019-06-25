// needed to instal node-fetch in node.js

const fetch = require('node-fetch');

fetch("http://localhost:3000/api/article",{
  method: "POST",
  headers:{
    "Accept": "application/json, text/plain",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(
    {"id":"k10011770391000","title":"hello","link":"https://kueiapp.com","easy_link":"https://kueiapp.com","publish_date":"2019-01-01T01:01:01.000Z","img_url":"","mp3_url":"","parsed":1}
  )
})
.then(function(res)
{
  return res.json()
})
.then(function(data)
{
  console.log(data)
})
