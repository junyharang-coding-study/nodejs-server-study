// main으로 들어오는 요청에 대한 Route 처리
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");                   // 상대 경로를 이용하기 위한 것



router.get("/", function(request, response) {  // url Routing

    let id = request.user;
    
// main Page는 Login이 될 때만(세션 정보가 있을때만) 접근 가능하게 한다.
    if(!id) {
        response.render("login.ejs");
    }

    console.log("main.js가 동작하였습니다", request.user);
    // get으로 Data를 받을 때는 request.param('email') 과 같이 하여 받는다.
    // response.sendFile(path.join(__dirname, "../public/main.html"))

    response.render("main.ejs", {"id" : id});

});

// router를 내보내기(exports) 함으로 다른 File에서 호출 가능하게 만든다.
module.exports = router;