var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku

// MySQL connection, so that it looks to the SQL page for the table to be built.
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password:(didnt buildf it with a password)
  password: "",
  database: "bamazon_DB"
});

  connection.connect(function(err) {
    console.log("Congratulations, and Welcome to !Bamazon");
    if (err) throw err;
    console.log("");
    console.log("");
    // Friendly greeting about the store and sales
    console.log("These are our products currently for sale! take a peek and see if anthing is appealing!")
    console.log("");
    console.log("");
    displayAll();
  });

  

  function displayAll() {
    connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
      if (err) throw err;
        console.table(res);
        console.log("");
        customerInput();
      });
      
    };
//INQUIRER SECTION  -asks user what they would like to order and quantity
function customerInput(){

  inquirer.prompt([
    // user picks which one of the products they would like to purchase
    {
      // user chosses which item they would like to purchase
      type: "list",
      name: "productID",
      message: "What is the ID number of the product you would like to purchase?",
      choices: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    },
    {
      // user chooses the quantity of the product chosen above, to purchase
      type: "input",
      message: "How many would you like to purchase?",
      name: "quantity"
    },
    // {
    //   //asks the user if that is the actual purchase they want to make
    //   type: "confirm",
    //   message: "Is this the correct item to purchase?",
    //   name: "confirm",
    //   default: true
    // }

  ])
  .then(function(userPurchaseConfirm){
      
    // the ID/item of the product they would like to purchase
    var attemptedPurchase= userPurchaseConfirm.productID 
    // the quantity of the product they would like to purchase
    var numberPurchase=userPurchaseConfirm.quantity

     //************************************************************/
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [attemptedPurchase], function(err, res) {
      if (res[0].stock_quantity < parseInt(numberPurchase)) { // if the result the user guesses stock quantitiy is less than the amount the user wants
        console.log("We Apologize, but !Bamazon currently does not have that many in stock.");
      } else {
        console.log("Enjoy your purchase from !Bamazon!")
         console.log("\n We at !Bamazon hope you enjoy your purchase ( ͡° ͜ʖ ͡°)\n")
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: res[0].stock_quantity - parseInt(numberPurchase)
        },
        {
          id: attemptedPurchase
        }

      ],function(err, result) {
        
        console.log("The price of " + numberPurchase + " " + res[0].product_name + "s" + " is " +  res[0].price * parseInt(numberPurchase) + " dollars each.");

        connection.end();
          
        })
      }
    })})
    //*********************************************************** */
  //   if(userPurchaseConfirm.confirm){
  //     //If the user does confirm on the purchase, the following text pops up to let them know it has gone through
  //     console.log("Enjoy your purchase from !Bamazon!")
  //     console.log("\n We at !Bamazon hope you enjoy your purchase ( ͡° ͜ʖ ͡°)\n")
  //   }
  //   else{
  //     //If the user backs off of the selection they have made, the following text pops up to let them know it has been cancelled
  //     console.log("\n That is alright! Enjoy the day, and come back to visit again!\n")
  //   }
  // });
}
  // connect();
  displayAll();