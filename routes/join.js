// join로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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

    let msg;
    let errMsg = request.flash("error");
    
    if(errMsg) msg = errMsg;

    console.log("get join url");

    // response.sendFile(path.join(__dirname, "../public/join.html"));

    response.render("join.ejs", {"message" : msg});

});

passport.serializeUser(function(user, done) {

    console.log("passport session save : ", user.id);

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {

    console.log("passport session get ID : ", id);

    done(null, id);

})

// passport를 이용한 회원 가입
passport.use("local-join", new LocalStrategy ({
        usernameField : "email",
        passwordField : "password",
        paaReqToCallback : true
    }, function(request, email, password, done) {
        console.log("local-join callback called");

        let query = connection.query("select * from user where userEmail=?", [email],
            function(error, rows) {
                if(error) return done(error);

                if(rows.length) {
                    console.log("이미 가입된 Email 주소 입니다!");

                    return done(null, false, {message : "이미 가입된 Email 주소 입니다!"})

                } else {

                    let sql = {
                        userEmail : email, 
                        password : password,
                    };

                    let query = connection.query('insert into user set ?', sql, 
                    function(error, rows) {

                        if(error) throw error

                        return done(null, {"email" : email, "id" : rows.insertId});

                    })
                }
        })
    }));

router.post("/", passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash : true
    })
)

// Post를 이용한 회원 가입
/*
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
*/

module.exports = router;