DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  ID INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT (10) NULL,
  sold INT(10) DEFAULT 0,
  PRIMARY KEY (ID)
);

SELECT * FROM  products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Teddy", "Apparrel", 35.00, 40), ("Sex Stool", "Furniture", 49.99, 25), ("Hitatchi Wand", "Devices", 59.71, 76), ("Condoms", "Protection", 15.49, 100), ("Kama Sutra", "Books", 104.98, 9), ("Healthy Sexuality", "Books", 24.99, 47), ("Edible Underware", "Apparel", 7.99, 69), ("Dental Dam", "Protection", 15.99, 36), ("Bondage Swing", "Furniture", 69.95, 57), ("Fleshlight", "Devices", 79.95, 25);