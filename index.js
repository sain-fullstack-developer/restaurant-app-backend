const express = require("express");
const sqlite3 = require("sqlite3");
const { dishesSchema } = require("./schema/dishesSchema");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		headers: ["Content-Type", "Authorization"],
	})
);

const db = new sqlite3.Database("./database/data.db");

let TableList;

db.serialize(() => {
	if (dishesSchema) {
		db.run(dishesSchema, (err) => {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Table Dishes created successfully");
			}
		});
	}

	//Table existance check
	function checkTableExists(tableName) {
		const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`;

		db.get(query, [], (err, row) => {
			if (err) {
				console.error(err);
				return;
			}

			if (row) {
				console.log(`Table '${tableName}' exists.`);
			} else {
				console.log(`Table '${tableName}' does not exist.`);
			}
		});
	}

	checkTableExists("dishes");

	// Data Exisistance Check
	function checkDataExists() {
		const query = "SELECT * FROM dishes WHERE name = 'Chicken Tikka Masala'";
		db.get(query, [], (err, row) => {
			if (err) {
				console.error(err);
				return;
			}

			if (row) {
				console.log("Data already exists.");
				return;
			}
			db.run(
				`INSERT INTO dishes (name, description, price, image_url) VALUES
('Chicken Tikka Masala', 'A creamy and flavorful dish of chicken marinated in yogurt and spices, cooked in a tomato-based sauce.', 150, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=950&q=80'),
('Dal Makhani', 'A rich and creamy lentil dish, cooked with butter, cream, and spices.', 120, 'https://www.cookwithmanali.com/wp-content/uploads/2019/04/Restaurant-Style-Dal-Makhani.jpg'),
('Biryani', 'A fragrant rice dish, cooked with meat, vegetables, and spices.', 280, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=510&q=80'),
('Naan', 'A leavened flatbread, cooked in a tandoor oven.', 30, 'https://images.unsplash.com/photo-1627906296851-6d9c5e4db592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80'),
('Tandoori Chicken', 'Chicken marinated in yogurt and spices, cooked in a tandoor oven.', 160, 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'),
('Lamb Rogan Josh', 'A rich and flavorful lamb dish, cooked in a tomato-based sauce with spices.', 180, 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80'),
('Vegetable Pakora', 'A savory fritter, made with vegetables, chickpea flour, and spices.', 150, 'https://images.unsplash.com/photo-1631788012420-a0d6a3cfcdfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'),
('Samosas', 'A savory pastry, filled with potatoes, peas, and spices.', 140, 'https://plus.unsplash.com/premium_photo-1675280081139-5d644e8f4697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'),
('Gulab Jamun', 'A sweet dish, made with milk solids, sugar, and rose water.', 120, 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80');`
			);
		});
	}

	checkDataExists();

	db.all("SELECT * from dishes", (err, rows) => {
		if (err) {
			console.log(err);
		} else {
			TableList = rows;
		}
	});
});

app.get("/restaurant/dishes", (req, res) => {
	if (TableList) {
		res.json(TableList);
	}
});

app.listen(5500, () => console.log("App listening on port 5500"));
