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
    database: process.env.db_name,
    charset: 'utf8'
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

app.get("/exp", (req, res) => {
    // let description1 =
    // {
    //     text: {
    //         data: `Click Here`,
    //         size: `36`,
    //         alignment: `center`
    //     },
    //     others: `kanon's house`
    // };
    let description1 =
    {
        text: {
            data: `Click rate 30%`,
            size: `36`,
            alignment: `center`
        },
        others: `kanon's house`
    };
    // var s = "kan's house"
    var data = JSON.stringify(description1);
    // s = s.replace(/'/g, '\'');
    // data = data.split("'").join("\\'");
    console.log(data);
    let sql = `INSERT INTO exp (description) VALUES ( '${data}');`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send({
            statuscode: 200
        })
    })

})
function simpleJSONstringify(obj) {
    var prop, str, val,
        isArray = obj instanceof Array;

    if (typeof obj !== "object")
        return false;

    str = isArray ? "[" : "{";

    function quote(str) {
        if (typeof str !== "string")
            str = str.toString();

        // When the actual variable was a number, it was returning a number between quotation marks
        // return str.match(/^\".*\"$/) ? str : '"' + str.replace(/"/g, '\\"') + '"';

        // Now, we are verifing if is a number and, if it is, we remove the quotation marks
        str = str.match(/^\".*\"$/) ? str : '"' + str.replace(/"/g, '\\"') + '"';

        if (isNaN(str.replace(/^["]/, '').replace(/["]$/, '')))
            return str;
        else
            return str.replace(/^["]/, '').replace(/["]$/, '');
    }

    for (prop in obj) {
        if (!isArray) {
            // quote property
            str += quote(prop) + ": ";
        }

        // quote value
        val = obj[prop];
        str += typeof val === "object" ? simpleJSONstringify(val) : quote(val);
        str += ", ";
    }

    // Remove last colon, close bracket
    str = str.substr(0, str.length - 2) + (isArray ? "]" : "}");

    return str;
}
app.listen(process.env.app_port, () => {
    console.log("server start in: ", process.env.app_port);
})