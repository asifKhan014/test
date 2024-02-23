const pgp = require('pg-promise')();
const connectionString = 'postgres://postgres:Asif3020@@localhost:5432/Todo';

const db = pgp(connectionString);
db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
        console.log('Connected to database');
    })
    .catch(error => {
        console.error('Error connecting to database:', error.message || error);
    });

module.exports = db;
