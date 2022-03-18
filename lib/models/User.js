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

  static async getAllUsers() {
    const { rows } = await pool.query(
      `
          SELECT * FROM users
          `
    );
    const users = rows.map((row) => new User(row));
    return users;
  }

  static async getUserById(id) {
    const { rows } = await pool.query(
      `
          SELECT * FROM users WHERE id=$1 
          `,
      [id]
    );
    if (!rows[0]) return null;
    const user = new User(rows[0]);
    return user;
  }

  static async updateById(id, updates) {
    const user = await User.getUserById(id);
    if (!user) return null;

    const username = updates.username ?? user.username;
    const email = updates.email ?? user.email;

    const { rows } = await pool.query(
      `
          UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING *
          `,
      [username, email, id]
    );

    const updatedUser = new User(rows[0]);
    return updatedUser;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM users WHERE id=$1 RETURNING *
          `,
      [id]
    );
    if (!rows[0]) return null;
    const user = new User(rows[0]);
    console.log(user);
    return user;
  }
};
