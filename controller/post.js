const { TweetManager } = require("twitter.js")
const { client } = require("./get")
require("dotenv").config()


async function postTweet(tweet) {

  await client.login({ consumerKey: process.env.CONSUMER_KEY, consumerSecret: process.env.CONSUMER_SECRET, accessToken: process.env.ACCESS_TOKEN_KEY, accessTokenSecret: process.env.ACCESS_TOKEN_SECRET, bearerToken: process.env.BEARERTOKEN })
  const compose = new TweetManager(client)
  const post = await client.tweets.create({ text: tweet })
  console.log(post)

}

async function getallPostcodes() {
  const allPosts = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');


  return allPosts
}
async function resolveThreePost(fetchpostbyid) {
  let posts = []


  getallPostcodes().then((allposts) => {
    return allposts.json()
  }).then((allposts) => {
    for (let i = 0; i < 5; i++) {

      // 
      setTimeout(() => fetchpostbyid(allposts[i]).then((post) => changeTotext(post)), (i * (900000)))
    }


  })
}
function timeout(i) {

  setTimeout(() => console.log("yes" + i), 2200)
}


async function fetchpostbyid(id) {
  const post = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  return post.json()
}
function changeTotext({ by, id, score, text, title, url }) {

  let tweet = `✅Title:${title} 
🔗link: ${url}
🧑🏽postby:${by}

${goodmessage()}
`
  postTweet(tweet)
}
function goodmessage() {
  let messages = ["Have a great day", "Enjoy your read", "Follow for more"]
  return messages[1]

}
async function createTweetsofThreeposts() {
  await resolveThreePost(fetchpostbyid)
}
const express = require("express")
const app = express()
setInterval(createTweetsofThreeposts, 3200000)
app.listen(8000)
// createTweetsofThreeposts()

