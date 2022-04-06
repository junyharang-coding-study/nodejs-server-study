const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const main = require("./routes/main.js");
const mysql = require("mysql");                     // mysql Import (설치법 : $ npm install mysql --save)
const Connection = require("mysql/lib/Connection");

const port = 8080;

// mysql 연동
const connection = mysql.createConnection({
    host : "211.37.173.118",
    port : 3306,
    user : "chnops1",
    password : "chnops1234",
    database : "iomt_portal"
});

connection.connect();

app.use(express.static('public'));                  // public이라는 Directory를 static(정적)으로 기억하라고 명령
app.use(bodyPaser.json());                          // express Server에 나! Body Paser쓸거야! 라고 알려주는 명령이면서 Json으로 Client의 Data를 받겠다는 의미
app.use(bodyPaser.urlencoded({extended:true}));     // client에 오는 요청이 json 형태가 아닐 때 urlencoding으로 Data를 받겠다는 의미
app.use("/main", main);                             // /main으로 요청이 들어오면 routes/main.js으로 보낸다.
app.use("/", main);                                 // /로 요청이 들어오면 routes/main.js으로 보낸다.
app.set("view engine", "ejs");                      // express에게 view engine은 ejs를 쓰겠다고 명령! 설치법 : npm install ejs --save

app.listen(port, function() {
    console.log(`start Node Server! on port ${port}`);
});



app.post("/email_post", function(request, response) {
    // post방식은 get과 같이 Data를 받을 수 없고, bodyPaser를 통해 Data를 받아야 하므로, 설치 필요
    // 설치 명령어 : npm install body-paser --save
    console.log(request.body.email);
    // response.send(`<h1>Welcome ${request.body.email}! 👋</h1>`);

    response.render('email.ejs', {'email' : request.body.email});

});

app.post("/ajax_send_email", function(request, response) {

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