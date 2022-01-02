var mysql = require('mysql');

//mysql config

var connection = mysql.createPool({
	// connectionLimit: 10,
	// host: 'localhost',
	// user: 'root',
	// password: '',
	// database: 'appcentr_jms_test',
	// port: 3306,
	// dateStrings: true
  // host: '',
  //   user: 'admin',
  //   password: '',
  //   database: 'excelplas_test',
  //   port: 3306,
  //   dateStrings: true
	connectionLimit: 10,
	host: 'database-nrm-devtest.cqy9vmoqkcpg.ap-southeast-2.rds.amazonaws.com',
	user: 'admin',
	password: 'Ukr34020*',
	database: 'excelplas_test',
	port: 3306,
	dateStrings: true


});
//mysql connection 
connection.getConnection((err) => {
	if (err) {
		console.log('Error connecting to Db: ');
		console.log(err);
		//throw err;
		return 0;
	}
	console.log('Connection established');
});

module.exports = {
	connection
};


// host:'localhost',
// user:'root',
// password:'',
// database:'appcentr_jms_test',
// port:3306,
// dateStrings:true