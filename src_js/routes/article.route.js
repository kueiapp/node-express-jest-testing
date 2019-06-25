/* created by kueiapp.com */
// article.route.js
//-- /api/article

import express from 'express';
import articleCtrl from '../controllers/article.controller';
import paramValidation, {ensureToken} from '../config/validation';

const bodyParser = require('body-parser');

const router = express.Router();

// need to use bodyParser HERE when designed in module
router.use(bodyParser.json())


/*
* middleware function
* the data flow
* client --> /api/article/personal  --> ensureToken() -- next() --> getPersonalArticle
*/

/* route to /api/article/personal */
router.route('/personal').get( ensureToken, articleCtrl.getPersonalArticle )

/* /api/article  */
router.route('/')
  .get( articleCtrl.getArticle )
  .post( ensureToken, articleCtrl.insertArticle );

/* /api/article/:article_id,  article_id is a var  */
router.route('/:article_id')
  .put( articleCtrl.updateArticle )
  .delete( articleCtrl.deleteArticle );

export default router;
