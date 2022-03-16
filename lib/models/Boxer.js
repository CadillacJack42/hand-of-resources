const pool = require('../utils/pool');

module.exports = class Boxer {
  id;
  name;
  wins;
  losses;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.wins = row.wins;
    this.losses = row.losses;
  }

  static async insert({ name, wins, losses }) {
    const { rows } = await pool.query(
      `
      INSERT INTO boxers(name, wins, losses) VALUES ($1, $2, $3) RETURNING *
      `,
      [name, wins, losses]
    );

    const boxer = new Boxer(rows[0]);
    return boxer;
  }

  static async getAllBoxers() {
    const { rows } = await pool.query(`
    SELECT * FROM boxers
    `);
    const boxers = rows.map((row) => new Boxer(row));
    return boxers;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM boxers WHERE id=$1
      `,
      [id]
    );
    const boxer = new Boxer(rows[0]);
    return boxer;
  }

  static async updateById(id, updates) {
    const boxer = await Boxer.getById(id);
    if (!boxer) return null;

    const name = updates.name ?? boxer.name;
    const wins = updates.wins ?? boxer.wins;
    const losses = updates.losses ?? boxer.losses;

    const { rows } = await pool.query(
      `
          UPDATE boxers SET name=$1, wins=$2, losses=$3 WHERE id=$4 RETURNING *
          `,
      [name, wins, losses, id]
    );
    const updatedBoxer = new Boxer(rows[0]);
    return updatedBoxer;
  }
};
