const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/cart.json', (request, response) => {
  
  fs.readFile('./../public/cartData.json', function(err, data) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    //response.writeHead(200, {'Content-Type': 'text/html'});
    //response.write(data.toString());

    //var dd = JSON.parse(data.toString());
    

    //response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  	response.json(JSON.parse(data.toString()));
	response.end();
  });

  
 })



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.app = functions.https.onRequest(app);
