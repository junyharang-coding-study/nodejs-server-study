// join로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const mysql = require("mysql");

// mysql 연동
const connection = mysql.createConnection({
    host : "211.37.173.118",
    port : 3306,
    user : "chnops1",
    password : "chnops1234",
    database : "iomt_portal"
});

connection.connect();

router.get("/", function(request, response) {

    console.log("get join url");

    response.sendFile(path.join(__dirname, "../public/join.html"));

});

router.post("/", function(request, response) {

    let body = request.body;
    let email = body.email;
    let name = body.username;
    let password = body.password;

    let sql = {
        userEmail : email,
        username : name,
        password : password,
    };

    // let query = connection.query('insert into user (userEmail, username, password) values("' + email + '", "' + name + '", "' + password + '")', 
    let query = connection.query('insert into user set ?' , sql, 
    function(error, rows) {
        if (error) { throw error; }

        console.log("DB에 회원 정보가 정상적으로 입력 되었습니다!", rows.insertId, name);

        response.render("welcom.ejs", {"name" : name, "id" : rows.insertId})
    }); 

})

module.exports = router;