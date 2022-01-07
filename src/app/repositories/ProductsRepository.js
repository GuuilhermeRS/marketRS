const db = require('../../database');

class ProductsRepository {
  async find(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM products
      ORDER BY id ${direction};
    `);
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
    id, name, price, quantity_in_stock,
  }) {
    const [row] = await db.query(`
      UPDATE products
      SET name = $2, price = $3, quantity_in_stock = $4
      WHERE id = $1
      RETURNING *
    `, [id, name, price, quantity_in_stock]);
    return row;
  }

  async delete(product_id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [product_id]);
    return deleteOp;
  }
}

module.exports = new ProductsRepository();
