require("dotenv").config()
const axios = require("axios")
const { Client } = require('twitter.js');
const { postTweet } = require("./post");

const client = new Client();
// async function getuser(username) {
//
//
//   await client.loginWithBearerToken(process.env.BEARERTOKEN);
//
//   const user = await client.users.fetchByUsername(username);
//   return user
// }

async function getallPostcodes() {
  const allPosts = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');


  return allPosts
}
async function resolveThreePost(fetchpostbyid) {
  let posts = []
  getallPostcodes().then((allposts) => {
    return allposts.json()
  }).then((allposts) => {
    for (let i = 0; i < 3; i++) {

      // fetchpostbyid(allposts[i]).then((post) => postTweet(changeTotext(post)))
    }

  })
}



// resolveThreePost(fetchpostbyid)
async function fetchpostbyid(id) {
  const post = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  return post.json()
}
function changeTotext({ by, id, score, text, title, url }) {
  let tweet = `Title:${title}+
🔗Link:${url}+
🧑🏽by:${by}`;
  return tweet
}

async function createTweetsofThreeposts() {
  await resolveThreePost(fetchpostbyid)
}
module.exports = {
  client
}
