// email로 들어오는 요청에 대한 Route 처리
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

router.post("/form", function(request, response) {
    // post방식은 get과 같이 Data를 받을 수 없고, bodyPaser를 통해 Data를 받아야 하므로, 설치 필요
    // 설치 명령어 : npm install body-paser --save
    console.log(request.body.email);
    // response.send(`<h1>Welcome ${request.body.email}! 👋</h1>`);

    response.render('email.ejs', {'email' : request.body.email});

});

router.post("/ajax", function(request, response) {

    let email = request.body.email;

    let responseData = {};

    let query = connection.query('select nickname from user where userEmail="' + email + '"', function(error, rows) {
        if(error) throw error;

        if(rows[0]) {

            console.log(rows[0].nickname);

            responseData.result = "ok";
            responseData.name = rows[0].nickname;

        } else {

            responseData.result = "none";
            responseData.name = null;

            console.log(`해당 Email로 조회된 정보가 없습니다${rows[0]}`);

        }

        response.json(responseData);
    })
    // input 값에 대한 유효성 검사 하기 => select DB
});

module.exports = router;