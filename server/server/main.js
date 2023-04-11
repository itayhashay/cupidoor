const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())
app.use("/", require("./router"));

app.listen(2308, () => {
  console.log("Server listening on port 2308");
});
