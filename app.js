const express = require("express");
const app = express();
const bodyPaser = require("body-parser");

const port = 8080;

app.use(express.static('public'));   // public이라는 Directory를 static(정적)으로 기억하라고 명령
app.use(bodyPaser.json());                  // express Server에 나! Body Paser쓸거야! 라고 알려주는 명령이면서 Json으로 Client의 Data를 받겠다는 의미
app.use(bodyPaser.urlencoded({extended:true}));     // client에 오는 요청이 json 형태가 아닐 때 urlencoding으로 Data를 받겠다는 의미

app.listen(port, function() {
    console.log(`start Node Server! on port ${port}`);
});

app.get("/", function(request, response) {  // url Routing

    // response.send("<h1>Hello JunyHarang 👋</h1>");

    response.sendFile(__dirname + "/public/main.html")

});

app.get("/main", function(request, response) {  // url Routing
    // get으로 Data를 받을 때는 request.param('email') 과 같이 하여 받는다.
    response.sendFile(__dirname + "/public/main.html")

});

app.post("/email_post", function(request, response) {
    // post방식은 get과 같이 Data를 받을 수 없고, bodyPaser를 통해 Data를 받아야 하므로, 설치 필요
    // 설치 명령어 : npm install body-paser --save
    console.log(request.body.email);
    response.send(`<h1>Welcome ${request.body.email}! 👋</h1> <br> `);

});