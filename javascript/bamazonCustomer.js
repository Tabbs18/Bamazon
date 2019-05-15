//connect to the database
var mysql = require('mysql');
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: "bamazon"
});

connection.connect(function (error) {
  if (error) throw error;

  connection.query(
    "SELECT * FROM products",
    function (error, data, feilds) {
      for (var ctr = 0; ctr < data.length; ctr++) {
        console.log("ID: " + data[ctr].id + " PRODUCT: " + data[ctr].product_name + " $" + data[ctr].price);
      }
      inquirer.prompt([{
          name: "itemId",
          message: "Which product ID would you would like to buy?"
        },
        {
          name: "quantity",
          message: "How many units would you like to buy?"
        }
      ]).then(function (answers) {
        connection.query(
          "SELECT * FROM products WHERE ?", {
            id: answers.itemId
          },
          function (error, data,) {
            if (answers.stock_quantity > data[0].stock_quantity) {
              console.log("Insufficient quantity!");
              connection.end();
            } else {
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                    stock: data[0].stock - answers.stock_quantity,
                    sales: data[0].sales + (data[0].price * answers.stock_quantity)
                  },
                  {
                    id: answers.itemId
                  }
                ],

                function (error, data,) {
                  console.log("Order placed!");
                  connection.end();
                }
              );
            }
          }
        );
      });
    }
  );
});