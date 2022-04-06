const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const router = require("./routes/index.js");
const mysql = require("mysql");                     // mysql Import (설치법 : $ npm install mysql --save)
const Connection = require("mysql/lib/Connection");
// 설치법 : npm install passport passport-local express-session connect-flash --save-dev
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");

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
app.use(session({
    secret : "keyboard cat",
    resave : false,                                 // Session이 이미 있을 때, 다시 요청이 오면 다시 Session을 만들것인가에 설정을 'false'로 하여 disable 처리
    saveUninitialized : true                        
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);
app.set("view engine", "ejs");                      // express에게 view engine은 ejs를 쓰겠다고 명령! 설치법 : npm install ejs --save

app.listen(port, function() {
    console.log(`start Node Server! on port ${port}`);
});