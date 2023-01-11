const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABSE
});


exports.register = (req, res) => {
    console.log(req.body);


const{ email, password } = req.body;

db.query(`SELECT email FROM teachers WHERE email = ?`, [email], async function(err, results) {
    if (err) {
        console.log(err);
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query(`INSERT INTO teachers  SET ?`, {email: email, password: hashedPassword}, (err, results) => {
        if (err) {
            console.log(err);
        }

    });


});

}