const fun = require('./function');
const {
  get_quote_by_search
} = require('./new_code');


async function getQuotes(options){
    try{
    var x = '';
   // console.log(x);
   
       console.log(`condition 2`);
       x = await get_quote_by_search(options);
       //console.log(x,`log`);
       return x;
    var bussiness = [];
    for (let i = 0; i < x.length; i++) {
        bussiness[i] = x[i];
        console.log(bussiness[i].customer_id);
           var a = await fun.query_exec(`select * from ep_customers where customer_id = '${bussiness[i].customer_id}' and status = '${1}'`);
         if(a.length!=0){
            bussiness[i].customer_name = a[0].customer_name;
            bussiness[i].email = a[0].email;
            console.log(bussiness[i]);
         }else{
            bussiness[i].customer_name ="";
            bussiness[i].email = "";
         }
    }

    console.log(bussiness[0]);
    //return (bussiness);
    return ({
        'status':1,
        'message':'Data fetched successfully!',
        'data':bussiness,
        'error':null
    });
  }catch(error){
      if(error){
          console.log(error);
          return ({
              'status':0,
              'message':'Failed to send quote',
              'error':error
          });
      }
  }
}

module.exports = {
    getQuotes
}