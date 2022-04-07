// logout으로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();


router.get("/", function(request, response) {

    request.logout();

    response.redirect("/login");

});

module.exports = router;