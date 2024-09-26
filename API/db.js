const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'merka2'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = db;
