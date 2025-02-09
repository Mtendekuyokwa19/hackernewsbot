const { TweetManager } = require("twitter.js")
const { client } = require("./get")
require("dotenv").config()
async function login() {

}

async function postTweet() {

  await client.login({ consumerKey: process.env.CONSUMER_KEY, consumerSecret: process.env.CONSUMER_SECRET, accessToken: process.env.ACCESS_TOKEN_KEY, accessTokenSecret: process.env.ACCESS_TOKEN_SECRET, bearerToken: process.env.BEARERTOKEN })
  const compose = new TweetManager(client)
  const post = await client.tweets.create({ text: "hello" })
  console.log(post)

}
postTweet()
