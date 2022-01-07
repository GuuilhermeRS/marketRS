const db = require('../../database');

class UsersRepository {
  async find(orderBy) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY name ${direction};
    `);
    return rows;
  }
}

module.exports = new UsersRepository();
