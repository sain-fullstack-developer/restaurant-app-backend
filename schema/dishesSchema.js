const dishesSchema = `CREATE TABLE dishes (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    price INTEGER,
    image_url TEXT
  );`;

module.exports = { dishesSchema };
