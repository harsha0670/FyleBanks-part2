const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/Banks2"));

app.get("/*", function (request, response) {
  response.sendFile(path.join(__dirname, "/dist/Banks2/index.html"));
});

app.listen(process.env.PORT || 8080);