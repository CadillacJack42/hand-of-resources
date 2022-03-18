const pool = require('../utils/pool');

module.exports = class Car {
  id;
  make;
  model;
  manual_transmission;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.manual_transmission = row.manual_transmission;
  }

  static async insert({ make, model, manual_transmission }) {
    const { rows } = await pool.query(
      `
          INSERT INTO cars(make, model, manual_transmission) VALUES ($1, $2, $3) RETURNING *
          `,
      [make, model, manual_transmission]
    );
    const car = new Car(rows[0]);
    return car;
  }

  static async getAllCars() {
    const { rows } = await pool.query(
      `
          SELECT * FROM cars
          `
    );
    const cars = rows.map((row) => new Car(row));
    return cars;
  }

  static async getCarById(id) {
    const { rows } = await pool.query(
      `
          SELECT * FROM cars WHERE id=$1
          `,
      [id]
    );
    if (!rows[0]) return null;
    const car = new Car(rows[0]);
    return car;
  }
};
