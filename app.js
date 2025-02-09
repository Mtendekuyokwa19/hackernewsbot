const express = require("express");
const path = require("path");
const { createTweetsofThreeposts } = require("./controller/post");
const app = express();
setInterval(() => {

}, 46400)

createTweetsofThreeposts()
app.listen(8011);
