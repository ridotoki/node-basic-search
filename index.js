const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

//middleware
app.use(cors());
//app.use(express.json()); //req.body

//Routes
app.get('/users', async(req, res) => {
    try {
        const { name } = req.query;

        //first name last name => %{}%
        //"Ta Huy" => %huy%
        //|| => OR SQL || => concat

        const users = await pool.query
        ("SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
        [`%${name}%`]);

        res.json(users.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("Listening to port 5000");
});