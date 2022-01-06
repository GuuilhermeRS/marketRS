const db = require('../../database');

class ProductsRepository {
  async find() {
    const rows = await db.query('SELECT * FROM products;');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [id]);

    return row;
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

  async update({
    id, name, price, quantity_in_stock
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET name = $1, price = $2, quantity_in_stock = $3
      WHERE id = $4
      RETURNING *
    `, [name, price, quantity_in_stock, id]);
    return row;
  }
}

module.exports = new ProductsRepository();
