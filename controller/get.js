
require("dotenv").config()
const { Client } = require('twitter.js');

const client = new Client();
async function getuser(username) {


  await client.loginWithBearerToken(process.env.BEARERTOKEN);

  const user = await client.users.fetchByUsername(username);
  return user
}


module.exports = {
  getuser
}

module.exports = {
  client
}
