import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const users = [ ];
const tweets = [ ];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);
    
    res.send("OK");
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweets.push(tweet);
    
    res.send("OK");
});

app.get('/tweets', (req, res) => {
    const last10 = getTweets()
    res.send(last10);
});

app.listen(5000);

function getTweets() {
    const last10 = [];
    
    if (tweets.lenght === 0) {
        return [];
    } else
    if (tweets.length > 10) {
        for (let i = tweets.length - 10; i < tweets.length; i++) {
            lastTweets(i);
        }
    }
    else {
        for (let i = 0; i < tweets.length; i++) { 
            lastTweets(i);
        }
    }
    
    function lastTweets(i) {
        const user = users.filter(element => element.username === tweets[i].username);

        last10.push(
            {
                "username": tweets[i].username,
                "avatar": user[0].avatar,
                "tweet": tweets[i].tweet
            });
    }

    return last10;
}