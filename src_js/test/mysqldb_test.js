/**
* by kueiapp.com
*/

import * as http from 'http';
import * as fs from 'fs';
import * as mysql from 'mysql';

const server = http.createServer((req, res)=>{
    res.end('Hello Node!');
});

// default framework without Express
http.createServer(function(request, response) {

  fs.readFile(__dirname + '/public/manifest.json', (err,file) => {
    if(err){
      response.writeHead(500)
      response.end("Error")
      return
    }
    else{
      response.writeHead(200,{
        "Content-Type": "application/json; charset=utf-8"
      })
      response.end(file, 'utf8')
    }
  })

})
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });

// ES5 requires are workable
const express = require('express');
const bodyParser = require('body-parser');
// import * as express from 'express';
// import * as bodyParser from 'body-parser';

// Express
const app = express();
app.use(express.static(__dirname + '/public'));


// create application/json parser to support json encoded bodies
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }) )// false:string, true:all types

const port = process.env.PORT || 3000;

/** node.js main **/
app.listen(port, function() {
  console.log("Listening on ",port);
});

const NODE_ENV = "development"
const MYSQL_HOST = "localhost"
const MYSQL_PORT = 3306
const MYSQL_USER = "root"
const MYSQL_PASS = "1234"
const MYSQL_DATABASE = "lifelab_nhk"

/** URI */
app.get('/mysql',function(res,resp)
{
  // create a connection
  const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DATABASE
  });

  var resp2 = resp;
  // arrow function is acceptable
  connectionPool.getConnection((err, connection) => {
    if (err) {
      resp2.send(err);
      console.log('連線失敗！');
    }
    else {
      resp2.send('連線成功！');
      console.log(connection);
    }
  });
});
