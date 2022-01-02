const fun = require('./function');

async function deleteQuote(option){
    try {
        var id = option.id;
        var y = await fun.query_exec(`select * from ep_quotes where quote_id = '${id}' and status = '${1}'`);
        if (y.length == 0) {
           return ({
                'status': 0,
                'message': `no quotes exists with ${id} id`,
                'error': `invalid quote id`
            });
           
        }
         var x = await fun.query_exec(`select * from ep_quotes where quote_id = ${id}`);
        // console.log(x);
        var data = {
            'status': 0
        };

        console.log(data);
        var update = await fun.query_update(`quote_id = ${id}`, data, 'ep_quotes');
        console.log(update);
        var update_1 = await fun.query_update(`quote_id = ${id}`,data,'ep_quote_transactions');
        console.log(update);
       return ({
            'status': 1,
            'message': `Quote deleted successfully`,
            'error': ''
        });
    } catch (error) {
        if (error) {
            console.log(error);
           return ({
                'status': 0,
                'message': `Some error occured`,
                'error': `${error}`
            });
        }
    }
}

module.exports = {
    deleteQuote
}