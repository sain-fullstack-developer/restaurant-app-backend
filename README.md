# Getting Started

Installation:
To install the app, you can clone the GitHub repository:

git clone https://github.com/sain-fullstack-developer/restaurant-app-backend.git

Once you have cloned the repository, you can install the dependencies by running the following command:
npm install

To run the app, you can run the following command:
npm start

app get opened on port http://localhost:5500/

About Application

The backend of the restaurant app is a Node.js Express server that uses a SQLite3 database to store and display the menu list items. The app exposes an endpoint at http://localhost:5500/restaurant/dishes that returns a JSON array of the menu items.

The backend app is responsible for:

Storing the menu items in the SQLite3 database.

Exposing the http://localhost:5500/restaurant/dishes endpoint.
