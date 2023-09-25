const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.get("/", function (request, response) {
  response.send(
    "Your server is listening."
  );
});


const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});