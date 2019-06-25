/* created by kueiapp.com */

// ES6
import setting from '../config/setting.js'
import db from './db.module.js';
import {SqlError} from '../config/ErrorHandler.js'
// token checking
import jwt from 'jsonwebtoken';

const insertArticle = function(insertValues,token)
{
  return new Promise( function(resolve, reject)
  {
    jwt.verify( token, setting.config.privateKey, function (err, payload)
    {
      if (err) {
        // return error on failed
        reject(err);
      }
      else{
          db.getConnection( function(connectionError, connection)
          {
            if (connectionError) {
              console.error('connection error: ', connectionError);
              reject(connectionError);
            }
            else {
              connection.query('INSERT INTO news_list SET ?',[insertValues], function(error, result)
              {
                if (error) {
                  console.error('SQL error: ', new SqlError('Hey! I cannot insert the data').message );
                  reject(error);
                }
                else if (result.affectedRows === 1) {
                  resolve(`Insert successfully！`);
                }

                // release memory
                connection.release();
              });
            }
          });
      }
    });
  });
};

const getPersonalArticle = function(token)
{
  return new Promise( function (resolve, reject)
  {
    // use token verified with private key to get personal article
    jwt.verify( token, setting.config.privateKey, function (err, payload)
    {
      if (err) {
        // return error on failed
        reject(err);
      }
      else {
        db.getConnection(function(connectionError, connection)
        {
          if (connectionError) {
            console.error('connection error: ', connectionError);
            reject('err:',connectionError);
          }
          else {
            connection.query( `SELECT * FROM news_list WHERE user_email = ?`, payload.user_email, function(error, result)
            {
                if (error) {
                  console.error('SQL error: ', new SqlError('Hey! I cannot get data').message );
                  reject(error);
                }
                else {
                  resolve(result);
                }

                // release memory
                connection.release();
            });
          }
        });

        // return payload on success
        // resolve(payload);
      }
    });
  });
};

const selectArticle = function()
{
  return new Promise( function (resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        console.error('connection error: ', connectionError);
        reject('err:',connectionError);
      }
      else {
        connection.query( `SELECT * FROM news_list`, function(error, result)
        {
            if (error) {
              console.error('SQL error: ', new SqlError('Hey! I cannot get data').message );
              reject(error);
            }
            else {
              resolve(result);
            }

            // release memory
            connection.release();
        });
      }
    });
  });
};

const modifyArticle = function(insertValues, aid)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        console.error('connection error: ', connectionError);
        reject('err:',connectionError);
      }
      else {
        connection.query(`UPDATE news_list SET ? WHERE id = ?`,[insertValues,aid], function(error, result)
        {
          if (error) {
            console.error('SQL error: ', new SqlError('Hey! I cannot update the data').message );
            reject(error);
          }
          else if (result.affectedRows === 0) { // no data
            resolve('No such data');
          }
          else if (result.message.match('Changed: 1')) {
            resolve('Done..');
          }
          else {
            resolve('Nothing changed..');
          }

          connection.release();
        });
      }
    });
  });
};

const deleteArticle = function(aid)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        console.error('connection error: ', connectionError);
        reject(connectionError);
      }
      else {
        connection.query(`DELETE FROM news_list WHERE id = '${aid}'`, function(error, result)
        {
          if (error) {
            console.error('SQL error: ', new SqlError('Hey! I cannot delete the data').message );
            reject(error);
          }
          else if (result.affectedRows === 1) {
            resolve('deleted！');
          }
          else {
            resolve('delete failed！');
          }

          connection.release();
        });
      }
    });
  });
}


export default {
  selectArticle, insertArticle, modifyArticle, deleteArticle, getPersonalArticle
};
