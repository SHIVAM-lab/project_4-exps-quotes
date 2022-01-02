//require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const fun = require('./function');
const app = express();
const awsServerlessExpress = require('aws-serverless-express');
const {
    connection
} = require('./connection.js');
app.use(express.static("public"));
const {
    sendEmail
} = require('./stmp_api');
const {
    getQuotes
} = require('./get_quotes');
const {
    getQuote_id
} = require('./get_quote_by_id');
const {
    createQuote
} = require('./create_quote');
const {
    update_quote_id
} = require('./update_quote_by_id');
const {
    deleteQuote
} = require('./delete_quote_id');
app.use(express.json());
const cors = require('cors');
app.use(cors());

/////////////////////////////////////////////GET_QUOTES//////////////////////////////////////////////////

app.post('/quote/getQuotes', async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
   var x =  await getQuotes(req.body);
   var y = JSON.parse(x).data;
    for(let i = 0; i < y.length; i++){
        console.log(y[i].customer_id);
           var a = await fun.query_exec(`select * from ep_customers where customer_id = '${y[i].customer_id}' and status = '${1}'`);
         if(a.length!=0){
            y[i].customer_name = a[0].customer_name;
            y[i].email = a[0].email;
            console.log(y[i]);
         }else{
            y[i].customer_name ="";
            y[i].email = "";
         }
    }
    x = JSON.parse(x);
    x.data = y;
    res.send(x);
});





///////////////////////////////////////END_OF_GET_QUOTES////////////////////////////////////////////////////


/////////////////////////////////////////////GET_QUOTE_BY ID//////////////////////////////////////////////////




app.post('/quote/getQuoteById', async function (req, res) {
    var id = req.body.id;
    if (!id) {
        res.send({
            'status': 0,
            'message': 'Id is null'
        });
        return 0;
    }
    res.send(await getQuote_id(req.body));
});



///////////////////////////////END_OF_ QUOTE_BY_ID///////////////////////////////////////////////////







/////////////////////////////////////////CREATE_QUOTE///////////////////////////////////////////////////


app.post('/quote/createQuote', async function (req, res) {
    var x = req.body;
    // || !x.quote_date
    if (!x.amount || !x.quote_date) {
        res.send({
            'status': 0,
            'message': 'one or more field is null'
        });
        return 0;
    }
    res.send(await createQuote(x));
});

//////////////////////////////////////////////////END_OF_QUOTE////////////////////////////////////////////////////






////////////////////////////////////////////////UPDATE_QUOTE_BY_ID//////////////////////////////////////////////////



app.post('/quote/updateQuote', async function (req, res) {
  var x = await update_quote_id(req.body);
  if(x.status==1){
      var y = await sendEmail(req.body);
      console.log(y);
      if(y.status==1){
          res.send(x);
      }
  }

});


//////////////////////////////END_OF_UPDATE_OUOTE_BY_ID//////////////////////////////////////////////////////

////////////////////////////////////////////////DELETE_QUOTE_BY_ID//////////////////////////////////////////////


app.post('/quote/deleteQuote', async function (req, res) {
    var id = req.body.id;
    if (!id) {
        res.send({
            'status': 0,
            'message': 'Id is null'
        });
        return 0;
    }
    res.send(await deleteQuote(req.body));

});


/////////////////////////////////////////////END_OF_DELETE_QUOTE_BY_ID/////////////////////////////////////////////////////




//////////////////////////////////////////BEGENNING_OF_SEND_EMAIL////////////////////////////////////////////////





////////////////////////////////////////////END_OF_SEND_EMAIL////////////////////////////////////////////////


// app.listen(3000, function(req,res){
//    console.log('server is listening on port');
// });
const server=awsServerlessExpress.createServer(app);
exports.handler=(event,context)=>{
	console.log("Event handler :"+JSON.stringify(event));
	awsServerlessExpress.proxy(server,event,context);
}