const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("index sayfası").status(200);
});

const port = 3000;
app.listen(port, (res, req) => {
  console.log(`App starter on port ${port}`);
});
