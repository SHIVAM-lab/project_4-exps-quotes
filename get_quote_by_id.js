const fun = require('./function');

async function getQuote_id(option) {
    try {
        var id = option.id;
        var test = [];
        var x = await fun.query_exec(`SELECT * FROM ep_quotes where quote_id = '${id}' and status = '${1}'`);
        console.log(x);
        if (x.length == 0) {
            var bussiness = {
                "status": 0,
                "message": 'no test with this id exists',
                "error":'Invalid Id'
            };
            return (bussiness);
        }
        var bussiness = [];
        for (let i = 0; i < x.length; i++) {
            bussiness[i] = x[i];
            var a = await fun.query_exec(`select * from ep_customers where customer_id = '${bussiness[i].customer_id}'`);
            if(a.length!=0){
                bussiness[i].customer_name = a[0].customer_name;
                bussiness[i].email = a[0].email;
                console.log(bussiness[i]);
             }else{
                bussiness[i].customer_name ="";
                bussiness[i].email = "";
             }
             var b= await fun.query_exec(`select * from ep_quote_transactions where quote_id = '${bussiness[i].quote_id}'`);
            // console.log(b);
           
         
             test = b;
        }
        console.log(bussiness[0],`monday`);
        for(let j = 0; j < test.length; j++){
            var c = await fun.query_exec(`select * from ep_test_type where test_type_id = '${test[j].test_type_id}'`);
            //console.log(c);
            if(c.length!=0){
           console.log(c,`isha`,j);
            test[j].polymer_type_id = c[0].polymer_type_id;
            test[j].product_type_id = c[0].product_type_id;
            test[j].test_type_code = c[0].test_type_code;
            test[j].test_type_name = c[0].test_type_name;
            test[j].status =c[0].status;
        
        }
           
        }
        bussiness[0].tests = test;
        console.log(bussiness);
     
        return ({
            'status':1,
            'data':bussiness[0],
            'message':'Data fetched successfully!',
            'error':null
      });
    } catch (error) {
        if (error) {
            console.log(error);
            return ({
                'status': 0,
                'message': "Failed to find Quote!",
                'error':error
            });
        }
    }

}
module.exports = {
    getQuote_id
}