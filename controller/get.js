require("dotenv").config()
const axios = require("axios")
const { Client } = require('twitter.js');
const { postTweet } = require("./post");

const client = new Client();

module.exports = {
  client
}
