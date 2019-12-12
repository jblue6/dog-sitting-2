const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());

const db = process.env.MONGO_URI;

//connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

//use routes
app.use("/api/information", require("./routes/information"));
app.use("/api/prices", require("./routes/prices"));
// app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("react-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "react-app", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
