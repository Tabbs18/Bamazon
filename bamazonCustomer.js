//connect to the database
var mysql = require('mysql');
var inquirer = require("inquirer");
var table = require("console.table");


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '',
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  connection.query('SELECT * FROM  bamazon.products', function (error, results, fields) {
    // When done with the connection, release it.
    console.log('The solution is: ', results);

    // Handle error after the release.
    if (error) throw error;
    console.table(results);

    // Don't use the connection here, it has been returned to the pool.
  });

  //   connection.end();
  console.log('connected as id ' + connection.threadId);
});

inquirer.prompt([
  {
    name:"choice",
    type: "input",
    message:"what is the ID of the product you would like to purchase?"
  },
  {
    name:"number",
    type:"input",
    message:"how many items would you like to puchase?"
  }
]).then(function(answer){
  var chosenItem;
      for (var i=0; i < res.length; i++){
      if(res[i].item_id === answer.choice){chosenItem = res[i];
      }
    }

  if(chosenItem.stock_quantity < parseInt(answer.number)){
    console.log("Item available");




// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.