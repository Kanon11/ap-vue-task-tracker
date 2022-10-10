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

let description1 =
{
    text: {
        data: `Click Here`,
        size: `36`,
        alignment: `center`
    },
    others: `kanon's house`
};
// var s = "kan's house"
var data = JSON.stringify(description1);
// s = s.replace(/'/g, '\'');
data = data.split("'").join("\\'");
console.log("kc", data);
// console.log(JSON.stringify(description1));


// let description2 =
// {
//     text: {
//         data: Click rate 30%,
//         size: 36,
//         alignment: center
//     },
//     others: something string
// };
// let description3 =
// {
//     text: {
//         data: Click Here,
//         size: 36,
//         alignment: center
//     },
//     others: something special alamin's string
//            };
// let dbConf = {
//     connectionLimit: parseInt(DB_POOL_MAX),
//     host: DB_HOST,
//     user: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
//     multipleStatements: true
// };
// const dbConnection = makeDb(dbConf);
// const dbConnectionObject = util.promisify(dbConnection.query).bind(dbConnection);
// let sql = `INSERT INTO product_description (product_id, description) VALUES ('${pdid}','${JSON.stringify(description})')`;
// let result = await dbConnectionObject(sql);