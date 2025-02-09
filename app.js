const express = require("express");
const { router } = require("./routes/route");
const path = require("path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use("/", router);
app.use("/newcrop", router);

app.use("/newfarmer", router);

app.use("/crop/:crop", router);

app.use("/farmer/:username", router);
app.listen(8011);
