const db = require('../../database');

class ProductsRepository {
  async find() {
    const rows = await db.query('SELECT * FROM products;');
    return rows;
  }

  async create({
    id, name, price, quantity_in_stock,
  }) {
    const [row] = await db.query(`
      INSERT INTO products(id, name, price, quantity_in_stock)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [id, name, price, quantity_in_stock]);
    return row;
  }
}

module.exports = new ProductsRepository();