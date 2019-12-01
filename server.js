const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

const db = config.get("mongoURI");

//connect to Mongo
// mongoose
//   .connect(db, { useNewUrlParser: true, useCreateIndex: true })
//   .then(() => console.log("Mongo DB connected"))
//   .catch(err => console.log(err));

//use routes
app.use("/api/information", require("./routes/information"));
app.use("/api/prices", require("./routes/prices"));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
