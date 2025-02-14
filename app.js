
const { TweetManager } = require("twitter.js")
const { client } = require("./controller/get.js")
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

      fetchpostbyid(allposts[i]).then((post) => setTimeout(() => changeTotext(post, hackernewsurl(allposts[i])), i * 3600000))
    }


  })
}
function hackernewsurl(id) {
  return `https://news.ycombinator.com/item?id=${id}`
}
async function fetchpostbyid(id) {
  const post = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  return post.json()
}
function changeTotext({ by, id, score, text, title, url }, hackernewsurl) {

  let tweet = `✅Title:${title} 
🔗link: ${url}
🧑🏽postby:${by}

hacker's url: ${hackernewsurl}

${goodmessage()}
`
  postTweet(tweet)
  // console.log(tweet)
}
function goodmessage() {
  let messages = ["Have a great day", "stay dangerous", "Enjoy your read", "Follow for more", "happy hacking", "stay safe", "Have a great week", "Peace out", "Checkout our github repo"]
  let randomIndex = Math.floor(Math.random() * messages.length - 1)
  return messages[randomIndex]

}
async function createTweetsofThreeposts() {
  await resolveThreePost(fetchpostbyid)
}
const express = require("express")
const app = express()
setInterval(createTweetsofThreeposts, 7200000)
app.listen(8000)

// createTweetsofThreeposts()

