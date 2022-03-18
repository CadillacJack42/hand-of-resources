const pool = require('../utils/pool');

module.exports = class Strain {
  id;
  created_at;
  strain;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.strain = row.strain;
  }

  static async getAllStrains() {
    const { rows } = await pool.query(
      `
          SELECT * FROM cannabis
          `
    );
    const strains = rows.map((row) => new Strain(row));
    return strains;
  }
};
