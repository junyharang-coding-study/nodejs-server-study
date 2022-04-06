// main으로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");                   // 상대 경로를 이용하기 위한 것

router.get("/", function(request, response) {  // url Routing

    // response.send("<h1>Hello JunyHarang 👋</h1>");

    response.sendFile(path.join(__dirname, "../public/main.html"))

});

router.get("/main", function(request, response) {  // url Routing
    // get으로 Data를 받을 때는 request.param('email') 과 같이 하여 받는다.
    response.sendFile(path.join(__dirname, "../public/main.html"))

});

// router를 내보내기(exports) 함으로 다른 File에서 호출 가능하게 만든다.
module.exports = router;