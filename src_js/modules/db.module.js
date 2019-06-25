/**
* by kueiapp.com
*/
// ES6
import * as mysql from 'mysql';
import setting from '../config/setting.js'
import {SqlError} from '../config/ErrorHandler.js'

// create a connection
const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: setting.db.MYSQL_HOST,
  user: setting.db.MYSQL_USER,
  password: setting.db.MYSQL_PASS,
  database: setting.db.MYSQL_DATABASE
});

connectionPool.getConnection(function(err, connection)
{
  if (err) {
    console.error( new SqlError('OH NO! connecting to SQL failed!').message );
  }
  else {
    console.log('mysql connection ready..');
  }
});

export default connectionPool;
