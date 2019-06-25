/* created by kueiapp.com */

import bcrypt from 'bcrypt';
import userModule from '../modules/user.module';

const selectAllUsers =  function(req, res)
{
  userModule.selectAllUsers()
  .then( function(result)
  {
    res.setHeader('Content-Type', 'application/json')
    res.send(result); // 成功回傳result結果
  })
  .catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

const createUser =  function(req, res)
{
  // user input
  const insertValues = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_password: bcrypt.hashSync(req.body.user_password, 10) // encrypt password by Bcrypt
  };
  console.log("to createUser")
  userModule.createUser(insertValues)
  .then( function(result)
  {
    res.send(result);
  })
  .catch((err) => { return res.send(err); });
};

const modifyUser =  function(req, res)
{
  // from /user/:user_id
  const userId = req.params.user_id;
  // user post
  const insertValues = req.body;
  userModule.modifyUser(insertValues, userId)
  .then( function(result)
  {
    res.send(result);
  })
  .catch((err) => { return res.send(err); });
};

const deleteUser =  function(req, res)
{
  // from /user/:user_id
  const userId = req.params.user_id;
  userModule.deleteUser(userId)
  .then( function(result)
  {
    res.send(result);
  })
  .catch((err) => { return res.send(err); });
};

const userLogin = function(req, res)
{
  // user input user_mail
  const insertValues = req.body;
  userModule.userLogin(insertValues)
  .then( function(result)
  {
    res.setHeader('Content-Type', 'application/json')
    res.send(result);
  })
  .catch((err) => { return res.send(err); });
};


export default {
  selectAllUsers,
  createUser,
  modifyUser,
  deleteUser,
  userLogin
};
