const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const main = require("./main.js");
const email = require("./email.js");
const join = require("./join.js");
const login = require("./login.js");
const logout = require("./logout.js");

router.get("/main", function(request, response) {  // url Routing

    console.log("/routes/index.js가 호출 되었습니다!")
    console.log("/가 요청 되었습니다!")

    // response.send("<h1>Hello JunyHarang 👋</h1>");

    response.sendFile(path.join(__dirname, "../public/main.html"))

});

router.use("/main", main);                             // /main으로 요청이 들어오면 routes/main.js으로 보낸다.
router.use("/", main);                                 // /로 요청이 들어오면 routes/main.js으로 보낸다.
router.use("/email", email);
router.use("/join", join);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;