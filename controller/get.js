require("dotenv").config()
const { Client } = require('twitter.js');

const client = new Client();

module.exports = {
  client
}
