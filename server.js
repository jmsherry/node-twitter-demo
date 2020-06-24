// https://developer.twitter.com/en/apps/2354997
require("dotenv").config();
const Twitter = require("twitter");

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET,
} = process.env;

console.log(`
  consumer_key: ${CONSUMER_KEY}
  consumer_secret: ${CONSUMER_SECRET}
  access_token_key: ${ACCESS_TOKEN_KEY}
  access_token_secret: ${ACCESS_TOKEN_SECRET}`);

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

// USER TIMELINE SEARCH
// const params = { screen_name: "i4nw" };
// const url = "statuses/user_timeline";

// HASHTAG SEARCH
// const params = {q: '#etherium'};
// const url = 'search/tweets.json';

// client.get(url, params, function (error, tweets, response) {
//   if (error) {
//     console.log("error", error);
//     // console.log('response', response);
//   } else {
//     console.log(tweets);
//     let formattedTweets = Array.isArray(tweets) ? tweets : tweets.statuses;
//     formattedTweets.forEach((tweet, i) => console.log(`${i}. ${tweet.text}\n`));
//   }
// });

/***************************************************************************
 * STREAMING API
 ***************************************************************************/

client.stream("statuses/filter", { track: "#makingthejump" }, function (
  stream
) {
  stream.on("data", function (event) {
    console.log("data", event);
    console.log(event && `${event.text} - ${event.user.screen_name}`);
  });

  stream.on("error", function (error) {
    throw error;
  });
});
