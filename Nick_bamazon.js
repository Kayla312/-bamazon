
// validateInput makes sure that the user is supplying only positive integers for their inputs
function userInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive number, that is more than zero.';
	}
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: userInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: userInput,
			filter: Number
        },
        {
            type: "confirm",
            message: "Are you sure this is the purhcase you want to make?",
            name: "confirm",
            default: true
        }
        
	]).then(function(input) {
		// console.log('Customer has selected: \n    id = '  + input.id + '\n    quantity = ' + input.quantity);

		var item = input.id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var postSale = '';
		for (var i = 0; i < data.length; i++) {
			postSale = '';
			postSale += 'Item ID: ' + data[i].id + '  //  ';
			postSale += 'Product Name: ' + data[i].product_name + '  //  ';
			postSale += 'Department: ' + data[i].department_name + '  //  ';
			postSale += 'Price: $' + data[i].price + '\n';

			console.log(postSale);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}

// runBamazon will execute the main application logic
function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	displayInventory();
}

// Run the application logic
runBamazon();