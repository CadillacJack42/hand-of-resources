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

  static async updateById(id, updates) {
    const contact = await Contact.getById(id);
    if (!contact) return null;

    const first_name = updates.first_name ?? contact.first_name;
    const last_name = updates.last_name ?? contact.last_name;

    const { rows } = await pool.query(
      `
        UPDATE contacts SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING *
        `,
      [first_name, last_name, id]
    );
    const updatedContact = new Contact(rows[0]);
    return updatedContact;
  }
};
