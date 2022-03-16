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
};
