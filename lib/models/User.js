const pool = require('../utils/pool');

module.exports = class User {
  id;
  created_at;
  user_id;
  username;
  email;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.user_id = row.user_id;
    this.username = row.username;
    this.email = row.email;
  }

  static async insert({ username, email }) {
    const { rows } = await pool.query(
      `
          INSERT INTO users(username, email) Values ($1, $2) RETURNING *
          `,
      [username, email]
    );
    const user = new User(rows[0]);
    return user;
  }
};
