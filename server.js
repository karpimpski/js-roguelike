const express = require("express"),
      app = express()

app.use(express.static(__dirname + "/src"))

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/src/index.html")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Listening on port " + port)
})