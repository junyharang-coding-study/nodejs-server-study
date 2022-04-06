const express = require("express");
const app = express();

const port = 8080;

app.listen(port, function() {
    console.log(`start Node Server! on port ${port}`);
});

app.get("/", function(request, response) {

    // response.send("<h1>Hello JunyHarang 👋</h1>");

    response.sendFile(__dirname + "/public/main.html")

});