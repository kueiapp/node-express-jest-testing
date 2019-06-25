/* created by kueiapp.com */

import mysql from 'mysql';
import bcrypt from 'bcrypt';
import setting from '../config/setting.js'
import db from './db.module.js';
import jwt from 'jsonwebtoken';

const selectAllUsers =  function()
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        reject(connectionError);
      }
      else {
        connection.query( `SELECT * FROM User`,  function(error, result)
        {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          }
          else {
            resolve(result);
          }

          // connection.end(); // deprecated
          connection.release();
        });
      }
    });
  });
};

const createUser =  function(insertValues)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      }
      else {
        connection.query('INSERT INTO User SET ?', insertValues,  function(error, result)
        {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          }
          else if (result.affectedRows === 1) {
            resolve(`Inserting successfully with user_id: ${result.insertId}`);
          }

          connection.release();
        });
      }// if-else
    });
  });
};

const modifyUser =  function(insertValues, userId)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        reject(connectionError);
      }
      else {
        connection.query('UPDATE User SET ? WHERE uid = ?', [insertValues, userId],  function(error, result)
        {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          }
          else if (result.affectedRows === 0) {
            resolve('no such data');
          }
          else if (result.message.match('Changed: 1')) {
            resolve('the data was updated');
          }
          else {
            resolve('nothing changed');
          }

          connection.release();
        });
      }// if-else
    });
  });
};

const deleteUser =  function(userId)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        reject(connectionError);
      }
      else {
        connection.query('DELETE FROM User WHERE uid = ?', userId,  function(error, result)
        {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          }
          else if (result.affectedRows === 1) {
            resolve('data deleted');
          }
          else {
            resolve('deleting failed');
          }

          connection.release();
        });
      }// if-else
    });
  });
};

const userLogin =  function(insertValues)
{
  return new Promise( function(resolve, reject)
  {
    db.getConnection( function(connectionError, connection)
    {
      if (connectionError) {
        reject(connectionError);
      }
      else {
        connection.query( 'SELECT * FROM User WHERE user_email = ?', insertValues.user_email,  function(error, result)
        {
            if (error) {
              console.error('SQL error: ', error);
              reject(error);
            }
            else if ( Object.keys(result).length === 0) {
              resolve('no such email address');
            }
            else {
              const dbHashPassword = result[0].user_password; // encryped pw from db
              const userPassword = insertValues.user_password; // encryped pw from user input
              // checking by bcrypt
              bcrypt.compare(userPassword, dbHashPassword)
              .then( function(res)
              {
                if (res) {
                  // here to create token by JWT
                  const payload = {
                    user_id: result[0].user_id,
                    user_name: result[0].user_name,
                    user_email: result[0].user_email,
                    exp: Math.floor(Date.now() / 1000) + (60 * 15) // min
                  };
                  // create signature and generate Access-Token
                  const token = jwt.sign(payload, setting.config.privateKey,{
                      algorithm: 'HS256'
                  });
                  // return
                  // resolve(Object.assign({ code: 200 }, { message: 'login successfully', token }));
                  resolve({
                    code: 200,
                    message: 'login successfully',
                    access_token: token,
                    token_type: 'bearer',
                    expires_in: (Date.parse(new Date()) / 1000) + setting.config.expiredOffsetTime, // UNIX timestamp
                    info: {
                        user_name: result[0].user_name,
                        user_email: result[0].user_email
                    }
                  })
                  // resolve('login successfully');
                } else {
                  resolve('login failed');
                }
              });
            }// if-else

            connection.release();
        });
      }// if-else
    });
  });
};


export default {
  selectAllUsers,
  createUser,
  modifyUser,
  deleteUser,
  userLogin
};
