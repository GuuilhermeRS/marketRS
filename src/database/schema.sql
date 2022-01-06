CREATE DATABASE marketrs;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity_in_stock INT
);