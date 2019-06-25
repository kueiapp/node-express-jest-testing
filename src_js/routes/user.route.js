/* created by kueiapp.com */
// user.route.js
//-- /api/user

import express from 'express';
import validate from 'express-validation';
import userCtrl from '../controllers/user.controller';
import valid from '../config/validation';

const router = express.Router();


/*
* route to localhost:[port]/user page.
*/

/* /api/user */
router.route('/')
  .get(userCtrl.selectAllUsers) // get all users
  .post( validate(valid.createUser), userCtrl.createUser); // create a user

/* /api/user/:user_id */
router.route('/:user_id')
  .put(userCtrl.modifyUser) // modify the user
  .delete(userCtrl.deleteUser); // delete the user

/* /api/user/login */
router.route('/login').post(userCtrl.userLogin); // select a specity user for comparing


export default router;
