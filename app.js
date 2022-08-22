require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors');
const mysql = require("mysql");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.db_server,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
});

db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("Mysql connected...");
})
app.use(cors());

app.get("/tasks", (req, res) => {
    let sql = `select * from tasks`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            "data": result,
            statuscode: 200
        });
    });

})
app.get("/tasks/:id", (req, res) => {
    let sql = `select * from tasks where id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            "data": result,
            statuscode: 200
        })
    })
})
app.post("/tasks/create", (req, res) => {
    let sql = `insert into tasks(text,day,reminder) values("${req.body.text}","${req.body.day}",${req.body.reminder})`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            statuscode: 200
        })
    })
})
app.post("/tasks/delete", (req, res) => {
    let sql = `delete from tasks where id=${req.body.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            statuscode: 200
        })
    })
})
app.post("/tasks/toggle", (req, res) => {
    let sql = `CALL sp_toggle_task(${req.body.id})`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            statuscode: 200
        })
    })
})

app.listen(process.env.app_port, () => {
    console.log("server start in: ", process.env.app_port);
})