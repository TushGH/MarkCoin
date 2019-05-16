var express = require('express');
// the code to send the request to server
var request = require('request');
var app = express();
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.engine('css', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/', express.static('stuff'));
var key = "RTS8gsN7cDBWkNHxejhKuhBLgu1o3snaMh";
var moneytoSend = 0.1 ;
// ################################## edit here #####################

var rpcuser= "user2812495047"
var rpcpassword= "pass1786911552a582eb8d04d462c3aa49111568a16a7ddf15a1d3e2ddf48a760a51e1"
//############################### please edit the port no in options url #####
var headers = {
    'content-type': 'text/plain;'
};
var par1 = ['\"'+key+ '\"' , moneytoSend * 2 , "\"donation\"" , "\"seans outpost\""]
var dataString = '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ", 0.1, "donation", "seans outpost"] }';
var d1 = '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": [' + par1 + ']}' ;

// console.log(dataString);
// console.log(d1);

 var options = {
     // Edit the url base on where you serer is located
     url: 'http://127.0.0.1:13037/',
     method: 'POST',
     headers: headers,
     body: d1,
     auth: {
         'user': rpcuser,
         'pass': rpcpassword
     }
 };

// Definde The Parameters to the RPC request ...
// The Function to send the money to
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("The Result of Transaction are");
        console.log(body);
    }
}



app.get('/index', function(req,res){
  res.render('index.html')
});

app.get('/science.html', function(req,res){
  console.log(req.query.add);
  moneytoSend = req.query.amt ;
  console.log("The Amount of money is ");
  console.log(moneytoSend);
  res.render('science.html')
});

app.get('/checkans', function(req,res){
  var a = req.query.question1
  var b = req.query.question2
  var c = req.query.question3
  var count = 0 ;
  if (a === 'true'){
    count ++ ;
  }
  if( b === 'true'){
    count ++ ;
  }
  if( c === 'true'){
    count ++ ;
  }
  if(count === 3){
    request(options, callback);
    res.render('congo.html')
  }
  else{
    res.render('loose.html')
  }

  res.render('science.html')
});
/*
app.get('/BitCoin', function(req,res){
  res.render('BitCoin.html')
});

app.get('/style.css', function(req,res){
  res.render('style.css')
});
*/




app.listen(8282, function() {
  console.log('Server running at http://127.0.0.1:8282/');
});
