const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const db = require("./database/db");

dotenv.config({ path: "../.env" }); 


const app = express();


const publicDirectory = path.join(__dirname, "../public"); //for css and javascript
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "hbs");


db.connect(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected to database");
    }
});



//Routes
app.use("/", require("./routes/pages.js"));
app.use("/auth", require("./routes/auth.js"));



app.listen(3000, () => {
    console.log("Server started on port 3000");
    console.log("Visit http://localhost:3000/ in your browser");

});

