/* created by kueiapp.com */
// -- /api

// import express from 'express';
// import config from '../config/config.js';

const express = require("express")
const setting = require("../config/setting.js")

const router = express.Router();

/*
* route to /api page.
*/

//-- /api
router.get('/', function(req, res)
{
  res.send(`here is /api`);
});

//-- /api/article
import ARTICLE_ROUTE from "./article.route.js"
router.use('/article', ARTICLE_ROUTE);

//-- /api/user
import USER_ROUTE from './user.route.js';
router.use('/user', USER_ROUTE);


// ES6
export default router;

// ES5
// module.exports = router;
