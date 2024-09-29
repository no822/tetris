var express = require("express");
var app = express();

app.use(express.static("src"));
// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server listening");
});
