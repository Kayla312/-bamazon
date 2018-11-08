var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.table("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
 
};
//Inquiry to ask customer what they want to do
function customerAsk(){
    
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the item ID of the product you'd like to purchase?",
      name: "id",
      validate: function validateID(name){
        
        if(isNaN(name)===true){
          console.log('\nBe sure to specify the correct ID as a number!')
          return false;
        }
        else if(name === ""){
          console.log('\nBe sure to specify the correct ID as a number!')
          return false;
        }
        else {
          return true;
        }
    }
    },
    {
      type: "input",
      message: "How many of them would you like to purchase?",
      name: "quantity",
      validate: function validateID(name){
        
        if(isNaN(name)===true){
          console.log('\nBe sure to specify the correct ID as a number!')
          return false;
        }
        else if(name === ""){
          console.log('\nBe sure to specify the correct ID as a number!')
          return false;
        }
        else {
          return true;
        }
    }
    },
   
  ])
  .then(function(response) {
    // console.log(response);
    item = response.id;
    // console.log('item: ', item);
    amount = response.quantity; 
    // console.log('amount: ', amount);
    checkValue(item, amount);
});
};
 customerAsk();
