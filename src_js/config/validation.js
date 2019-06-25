/* created by kueiapp.com */
// global validation.js

import Joi from 'joi';
// user Joi to validate input data

export default {
  // POST /api/user
  createUser: {
    body: {
      user_name: Joi.string().required(), // string and required
      user_email: Joi.string().email().trim().required(), // email format and required
      user_password: Joi.string().regex(/[a-zA-Z0-9]{6,16}$/).required() // length from 6 to 16, only alphabet and number, and required
    }
  }
};

export function ensureToken(req, res, next)
{
  // "authorization: Bearer {token}" is written in http header from client
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    console.log('bearer: ',bearerHeader)
    const bearerArray = bearerHeader.split('Bearer ');
    const bearerToken = bearerArray[1]; // Json Web Token
    req.token = bearerToken; // set to request and
    // go to next parameter: articleCtrl.getPersonalArticle
    next();
  }
  else {
    res.status(403).send(
      // Object.assign({ code: 403 }, { message: 'Please log in.' })
      { code: 403, message: 'Please log in.'} // same usage as above
    );
    // route will stop here when there's no next()
  }

};
