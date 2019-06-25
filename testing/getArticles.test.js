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

describe("Testing route /api/article and /api/user ", function () 
{
	beforeAll(() => {
      mysql
  });
  afterAll((done) => {
      done();
  });

	test('Get articles',  function(done) 
	{
		// first testing methods
		api.get('/article') 						// /api/article
	    .set('Access', 'application/json')
	    .expect(200,function(err,res)
    	{
    		if(err){
    			throw err;
    		}
    		else{
    			expect(res.type).toBe("application/json")
    			expect(res.body.length).toBe(5)
    		}
    		done();	
    	});
	});

	test('Test wrong path to get 404',  async function(done) 
	{
		// second testing methods
		const res = await api.get('/articles/man').set('Access', 'application/json')
	   
	  expect(404);
	  expect(res.type).toEqual('text/html');
	  done();
	});

});
