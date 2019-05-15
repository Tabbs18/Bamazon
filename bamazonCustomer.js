//connect to the database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '', 
  database: "bamazon"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  connection.query('SELECT * FROM  bamazon.products', function (error, results, fields) {
    // When done with the connection, release it.
    console.log('The solution is: ', results);
 
    // Handle error after the release.
    if (error) throw error;
 
    // Don't use the connection here, it has been returned to the pool.
  });
 
//   connection.end();
  console.log('connected as id ' + connection.threadId);
});




// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.