import express, {json} from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(json());

const users = [];
const usersTweets = [];



server.post("/sign-up", (req, res) => { 
    const user = req.body;
    if(!user.username || !user.avatar){
        return res.status(422).send('Unprocessable entity');
    }

    users.push(user);
    return res.status(201).send('OK');
});


server.post("/tweets", (req, res)=> {
    const tweet = req.body;
    const user = req.body.username;
console.log(user, "USER DO TWEETS")
    const isUser = users.find((value) => value.username === user);
    if(!isUser) {
        return res.status(404).send('User not found')
    }
    if(!tweet.tweet){
        return res.status(422).send("Tweet cannot be empty")

    }
    usersTweets.push(tweet);
    return res.status(201).send('OK');
});


server.get("/tweets", (req,res)=> {
    const tweets =  usersTweets.map((usersTweet) => {
        let avatar;

        users.forEach((user)=> {
            if (user.username === usersTweet.username){
                avatar = user.avatar;
            }
        });

        return {
            username: usersTweet.username,
            avatar: avatar,
            tweet: usersTweet.tweet
        }
    });

    const lastTweets= tweets.slice(tweets.length-10)
    const invertedLastTweets = lastTweets.reverse()


    res.status(200).send(invertedLastTweets);
});
















server.listen(5000,()=>{
    console.log("Server running on port 5000")
})
