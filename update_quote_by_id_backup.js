const fun = require('./function');

async function update_quote_id(option){
    try {
        var id = option.Id;
        var x = await fun.query_exec(`SELECT * FROM ep_quotes where quote_id = '${id}'`);
        console.log(x);
        if (x.length == 0) {
            var bussiness = {
                "status": 0,
                "message": 'no quote with this id exists'
            };
           return (bussiness);
        }
        var q_no, dates, cust_id, amounts, status;
        if (typeof option.q_no == undefined || option.q_no==null) {
            q_no = x[0].quote_number;
        } else {
            q_no = option.q_no;
        }
        if (typeof option.date == undefined || option.date==null) {
            dates = x[0].quote_date;
        } else {
            dates = option.date;
        }

        if (typeof option.cust_id == undefined || option.cust_id==null) {
            cust_id = x[0].customer_id;
        } else {
            cust_id = option.cust_id;
        }
        if (typeof option.amount == undefined || option.amount==null) {
            amounts = x[0].quote_amount;
        } else {
            amounts = option.amount;
        }
        if (typeof option.status == undefined || option.status==null) {
            status = x[0].status;
        } else {
            status = option.status;
        }

        var data = {
            'quote_number': q_no,
            'quote_date': dates,
            'customer_id': cust_id,
            'quote_amount': amounts,
            'status': status
        };

        console.log(data);
        var update = await fun.query_update(`quote_id = ${id}`, data, 'ep_quotes');
        console.log(update);
       return ({
            'status': 1,
            'message': 'Quote  updated successfully!',
            'error': ''
        });
    } catch (error) {
        if (error) {
            console.log(error);
           return ({
                'status': 0,
                'message': 'Failed to update Quote!',
                'error': error
            });
        }
    }
}

module.exports ={
    update_quote_id
}