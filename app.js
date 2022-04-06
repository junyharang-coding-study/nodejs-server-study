const express = require("express");
const app = express();

const port = 8080;

app.use(express.static('public'))   // public이라는 Directory를 static(정적)으로 기억하라고 명령

app.listen(port, function() {
    console.log(`start Node Server! on port ${port}`);
});

app.get("/", function(request, response) {  // url Routing

    // response.send("<h1>Hello JunyHarang 👋</h1>");

    response.sendFile(__dirname + "/public/main.html")

});

app.get("/main", function(request, response) {  // url Routing

    response.sendFile(__dirname + "/public/main.html")

});