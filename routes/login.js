// login로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();
const main = require("./main.js");
const email = require("./email.js");
const join = require("./join.js");
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

    response.render("login.ejs", {"message" : msg});

});

passport.serializeUser(function(user, done) {

    console.log("passport session save : ", user.id);

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {

    console.log("passport session get ID : ", id);

    done(null, id);

});

// passport를 이용한 회원 가입
passport.use("local-login", new LocalStrategy ({
        usernameField : "email",
        passwordField : "password",
        paaReqToCallback : true

    }, function(request, email, password, done) {
        console.log("local-login callback called");

        let query = connection.query("select * from user where userEmail=?", [email],
            function(error, rows) {
                if(error) return done(error);

                if(rows.length) {

                    return done(null, false, {"email" : email, "id" : rows[0].UID});

                } else {


                    return done(null, false, {"message" : "일치하는 회원 정보를 찾지 못했습니다!"});

                }
        });
    }));

router.post("/", function(request, response, next) {
    passport.authenticate('local-login', function(error, user, info) {
        if(error) response.status(500).json(error);

        if(!user) {
            return response.status(401).json(info.message);
        }

        request.logIn(user, function(error) {

            if(error) {
                return next(error);
            }

            return response.json(user);

        });
    })(request, response, next);
});


module.exports = router;