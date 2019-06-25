/* created by kueiapp.com */
// global config.js


const config = {
  version: '1.0.0',
  env: 'development',
  port: 3000,
  privateKey: 'my_private_key',
  expiredOffsetTime: 1000
};

const db = {
 "MYSQL_HOST" : "localhost",
 "MYSQL_PORT" : 3306,
 "MYSQL_USER" : "root",
 "MYSQL_PASS" : "1234",
 "MYSQL_DATABASE" : "lifelab_nhk"
}

// ES6
export default {config,db}

// ES5
// module.exports = config;
// module.exports = db;
