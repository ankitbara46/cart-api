const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const { parse } = require('querystring');
var bodyParser = require('body-parser');

const app = express();


app.use(express.static('public'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/cart.json', (request, response) => {
  
  fs.readFile('./../public/cartData.json', function(err, data) {
    response.json(JSON.parse(data.toString()));
	response.end();
  });

  
 });

app.get('/productDetails.json', (request, response) => {
  
  //console.log();
  fs.readFile('./../public/products.json', function(err, data) {
    //response.json(JSON.parse(data.toString()));
	//response.end(request.query.id);

	const product_id = request.query.id;

	const products = JSON.parse(data.toString());

	//console.log(products);

	products.items.forEach( product => {
		if(product.id == product_id){
			response.json(product);
			response.end();
		}
	} )

  });
  
 })




 	
 app.post('/updatecart', (request, response) => {
 	
	
	
  /*fs.readFile('./../public/cartData.json', function(err, data) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    
  	response.json(JSON.parse(data.toString()));
	response.end();
  });
*/


	


	if (request.method === 'POST') {
	      
	      fs.readFile('./../public/cartData.json', function(err, data) {
		    let jsonData = JSON.parse(data.toString());
		    let items = jsonData.items;

		    items.forEach( (item, index) => {
		    	
		    	if(request.body.id == item.id){
		    		if(request.body.quantity){
		    			items[index]['qty'] =  request.body.quantity;	
		    		}

		    		if(request.body.size){
		    			items[index]['size'] =  request.body.size;	
		    		}
		    		
					if(request.body.color){
						items[index]['color'] = request.body.color;	
					}
					 		    		
		    	}
	
		    })

		    jsonData.items = items;

		    //console.log(JSON.stringify(items));

		    fs.writeFile('./../public/cartData.json', JSON.stringify(jsonData), function(err, data) {
			    if(err) {
			        response.json({"success": false});
			    } else {
			    	response.json({"success": true});
			    }
				response.end();
			});

		  });

	    //response.end(request.body.firstName);
	}
	//response.json({"x":20});
	
  
 })



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.app = functions.https.onRequest(app);
