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

  static async update(id, updates) {
    const car = await Car.getCarById(id);
    if (!car) return null;

    const make = updates.make ?? car.make;
    const model = updates.model ?? car.model;
    const manual_transmission =
      updates.manual_transmission ?? car.manual_transmission;

    const { rows } = await pool.query(
      `
          UPDATE cars SET make=$1, model=$2, manual_transmission=$3 WHERE id=$4 RETURNING * 
          `,
      [make, model, manual_transmission, id]
    );
    const updatedCar = new Car(rows[0]);
    return updatedCar;
  }
};
