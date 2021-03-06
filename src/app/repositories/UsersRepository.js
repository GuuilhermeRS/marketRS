const db = require('../../database');

class UsersRepository {
  async find(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY name ${direction};
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE id = $1;
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM users
      WHERE email = $1;
    `, [email]);

    return row;
  }

  async create({ name, email, phone }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, phone)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, phone]);
    return row;
  }

  async update({
    id, name, email, phone,
  }) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $2, email = $3, phone = $4
      WHERE ID = $1
      RETURNING *
    `, [id, name, email, phone]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
