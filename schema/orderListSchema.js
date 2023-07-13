const orderListSchema = `CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    price INTEGER,
  );`;

module.exports = { orderListSchema };
