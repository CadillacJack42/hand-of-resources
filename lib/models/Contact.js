const pool = require('../utils/pool');

module.exports = class Contact {
  id;
  user_id;
  first_name;
  last_name;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
  }

  static async insert({ first_name, last_name }) {
    const { rows } = await pool.query(
      `
          INSERT INTO contacts(first_name, last_name) VALUES ($1, $2) RETURNING *
          `,
      [first_name, last_name]
    );
    const contact = new Contact(rows[0]);
    return contact;
  }

  static async getAllContacts() {
    const { rows } = await pool.query(
      `
        SELECT * FROM contacts
        `
    );
    const contacts = rows.map((row) => new Contact(row));
    return contacts;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
          SELECT * FROM contacts WHERE id=$1
          `,
      [id]
    );
    if (!rows[0]) return null;
    const contact = new Contact(rows[0]);
    return contact;
  }
};
