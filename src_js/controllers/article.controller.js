/* created by kueiapp.com */
// article.controller.js

import articleModule from '../modules/article.module';

const insertArticle = function(req, res)
{
  const insertValues = req.body;
  const token = req.token // from middleware
  console.log('insert an article:', JSON.stringify(insertValues) );
  // POST /api/article
  articleModule.insertArticle(insertValues, token)
  .then(function(result)
  {
    res.send(result);
  })
  .catch(function(err)
  {
    return res.send(err);
  });
}

const getPersonalArticle = function(req, res)
{
  // GET /api/article
  const token = req.token // from middleware
  articleModule.getPersonalArticle(token)
  .then(function(result)
  {
    res.setHeader('Content-Type', 'application/json')
    res.send(result);
  })
  .catch(function(err)
  {
    return res.send(err);
  });
};

const getArticle = function(req, res)
{
  // GET /api/article
  articleModule.selectArticle()
  .then(function(result)
  {
    res.setHeader('Content-Type', 'application/json')
    res.send(result);
  })
  .catch(function(err)
  {
    return res.send(err);
  });
};

const updateArticle = function(req, res)
{
  // UPDATE /api/article/:article_id
  const aid = req.params.article_id;
  const insertValues = req.body;
  console.log("update article id: "+ aid + ", value:" + JSON.stringify(insertValues) );

  articleModule.modifyArticle(insertValues, aid)
  .then(function(result) // promise resolved
  {
    res.send(result);
  })
  .catch(function(err) // promise reject
  {
    return res.send(err);
  });
};

const deleteArticle = function(req,res)
{
  // DELETE /api/article/:article_id
  const aid = req.params.article_id;
  console.log("delete article: "+ aid);

  articleModule.deleteArticle(aid)
  .then(function(result)
  {
    res.send(result);
  })
  .catch((err) => { return res.send('Error:'+err); });
}

export default {
  getArticle,insertArticle,updateArticle,deleteArticle,getPersonalArticle
};
