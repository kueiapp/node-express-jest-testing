const request = require('supertest');
require('../src_js/index.js');
require('../src_js/config/setting.js')
const mysql = require('../src_js/modules/db.module.js')

const api = request('http://localhost:3000/api'); 
let access_token; 

describe('Test the root path /api', function () 
{
	beforeAll(() => {
      mysql
  });
  afterAll((done) => {
      done();
  });
  test('It should response the GET method', function (done) 
  {
      api.get('/')
      .then( function (response) 
      {
          expect(response.statusCode).toBe(200);
          done();
      });
  });
});

describe("Testing authorization and get personal data", function () 
{
	beforeAll(() => { mysql });
  afterAll((done) => { done() });

	test('get access_token',  function(done) 
	{
		api.post('/user/login') 								// /api/user/login
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/x-www-form-urlencoded')
	    .send({
	      user_email: 'mm@gmail.com',
	      user_password: 'mmm111222'
	    })
	    .expect(200, function(err, res)
	    {
	      if(!err){ 
	      	expect(res.body.info.user_email).toBe('mm@gmail.com')
	      	expect(res.type).toBe("application/json")
	      	expect(res.body.info.user_email).toBe('mm@gmail.com')
		      access_token = res.body.access_token; 		// set token
			    
			    done();
				}
				else{
					throw err;
				}
	    });
	      
	});

	test('get personal article',  function(done) 
	{
		api.get('/article/personal') 							// /api/article/personal
	    .set('authorization', 'Bearer ' + access_token)
	    .set('Accept', 'application/json')
	    .set('Content-Type', 'application/json')
	    .expect(200, function(err, res) 
	    {
        if (!err){
        	expect(res.type).toBe('application/json')
        	done();
        } 
        else {
        	throw err;
        }
      });
	});

	test('User creates an article',  function(done) 
	{
		api.post('/article') // /api/article/personal
	    .set('Content-Type', 'application/json')
	    .set('authorization', 'Bearer ' + access_token)
	    .send({ 
	    	"id": "LO99924", 
	    	"title": "token insert4", 
	    	"link": "http://kueiapp.com4",
	    	"easy_link": "http://kueiapp.com4", 
	    	"user_email": "mm@gmail.com" 
	    })
	    .expect(200,function(err,res)
    	{
  			if (!err){
        	expect(res.type).toBe('text/html')
        	expect(res.text).toBe('Insert successfully！')
        	done();
        } 
        else {
        	throw err;
        }
    	});
	});

});
