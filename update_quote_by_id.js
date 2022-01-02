const fun = require('./function');

async function update_quote_id(option) {
    try {
        var k = '';
        var m = await fun.query_exec(`select * from ep_customers where email = '${option.email}'`);
        // console.log(m,`abcd`);
        if (option.customer_id == null && m.length == 0) {

            var data_1 = {
                'customer_name': option.customer_name,
                'email': option.email,
                'status': 1,
                'created_datetime': new Date()
            };
            var column = [];
            var values = [];
            for (var key in data_1) {

                column.push(key);
                values.push(data_1[key]);
            }
            console.log(data_1);
            var a = await fun.query_insert(column, values, 'ep_customers');
            // console.log(a,`line log ::24`);
            var y = await fun.query_exec(`select * from ep_customers`);
            k = y[y.length - 1].customer_id;
        } else {
            k = m[0].customer_id;
        }
        console.log(option.quote_id, `checkind`);
        if (option.quote_id == null || option.quote_id == "") {
            //create new quote
            number = await fun.query_exec(`select * from ep_quotes`);
            if (number.length != 0) {
                var s = number[number.length - 1].quote_number;
                z = parseInt(s.substring(1)) + 1;
                z = 'Q' + z;
                console.log(z);
                console.log(`if`)
            } else {
                z = 'Q' + 1;
                console.log(`else`);
            }
            delete number
            // console.log(z);
            var data = {
                'quote_number': z,
                'quote_date': option.quote_date,
                'customer_id': k,
                'quote_amount': option.quote_amount,
                'status': 1,
                'created_datetime': new Date()
            };
            var column = [];
            var values = [];
            for (var key in data) {

                column.push(key);
                values.push(data[key]);
            }
            console.log(data);
            delete z;
            var x = await fun.query_insert(column, values, 'ep_quotes');
            console.log(x);
            var test = option.tests;
            var pro = await fun.query_exec(`select quote_id from ep_quotes`);
            var zz = pro[pro.length - 1].quote_id;

            for (let i = 0; i < test.length; i++) {
                if (test[i].quote_transaction_id == null) {
                    //creating new transaction
                    data = {
                        'quote_id': zz,
                        'test_type_id': test[i].test_type_id,
                        'quantity': test[i].quantity,
                        'unit_price': test[i].unit_price,
                        'total': test[i].total,
                        'status': 1,
                        'created_datetime': new Date()
                    }

                    var column = [];
                    var values = [];
                    for (var key in data) {

                        column.push(key);
                        values.push(data[key]);
                    }
                    console.log(data);
                    var xy = await fun.query_insert(column, values, 'ep_quote_transactions');
                    console.log(xy);
                } else {
                    //updating existing transaction
                    data = {
                        'quote_id': zz,
                        'test_type_id': test[i].test_type_id,
                        'quantity': test[i].quantity,
                        'unit_price': test[i].unit_price,
                        'total': test[i].total,
                        'status': 1,
                        'created_datetime': new Date()
                    }
                    var xz = await fun.query_update(`quote_transaction_id=${test[i].quote_transaction_id}`, data, `ep_quote_transactions`);
                    console.log(xz);
                }
            }
            return ({
                'status': 1,
                'message': 'Quote successfully Created!',
                'error': " "
            });

        } else {
            //updating existring quote
            var number = await fun.query_exec(`select * from ep_quotes where quote_id = '${option.quote_id}'`);
            z = number[0].quote_number;
            delete number
            // console.log(z);
            var data = {
                'quote_number': z,
                'quote_date': option.quote_date,
                'customer_id': k,
                'quote_amount': option.quote_amount,
                'status': 1,
                'created_datetime': new Date()
            };
            var column = [];
            var values = [];
            for (var key in data) {

                column.push(key);
                values.push(data[key]);
            }
            console.log(data);
            delete z;
            //var x = await fun.query_insert(column, values, 'ep_quotes');
            var x = await fun.query_update(`quote_id = ${option.quote_id}`, data, 'ep_quotes');
            console.log(x);
            var test = option.tests;
            var pro = await fun.query_exec(`select quote_id from ep_quotes`);
            var zz = pro[pro.length - 1].quote_id;

            for (let i = 0; i < test.length; i++) {
                if (test[i].quote_transaction_id == null) {
                    //creating new transaction
                    data = {
                        'quote_id': option.quote_id,
                        'test_type_id': test[i].test_type_id,
                        'quantity': test[i].quantity,
                        'unit_price': test[i].unit_price,
                        'total': test[i].total,
                        'status': 1,
                        'created_datetime': new Date()
                    }

                    var column = [];
                    var values = [];
                    for (var key in data) {

                        column.push(key);
                        values.push(data[key]);
                    }
                    console.log(data);
                    var xy = await fun.query_insert(column, values, 'ep_quote_transactions');
                    console.log(xy);
                } else {
                    //updating existing transaction
                    data = {
                        'quote_id': option.quote_id,
                        'test_type_id': test[i].test_type_id,
                        'quantity': test[i].quantity,
                        'unit_price': test[i].unit_price,
                        'total': test[i].total,
                        'status': 1,
                        'created_datetime': new Date()
                    }
                    var xz = await fun.query_update(`quote_transaction_id=${test[i].quote_transaction_id}`, data, `ep_quote_transactions`);
                    console.log(xz);
                }
            }
            return ({
                'status': 1,
                'message': 'Quote Updated successfully !',
                'error': " "
            });

        }

        return ({
            'status': 1,
            'message': 'Quote successfully Created!',
            'error': " "
        });
    } catch (error) {
        if (error) {
            console.log(error);
            return ({
                'status': 0,
                'message': 'Failed to Create Quote type!',
                'error': error
            });
        }
    }
}

module.exports = {
    update_quote_id
}