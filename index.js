import express, {json} from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(json());

const users = [];




server.post("/sign-up", (req, res) => { 
    const user = req.body;
    if(!user.username || !user.avatar){
        return res.status(422).send('Unprocessable entity');
    }

    users.push(user);
    return res.status(201).send('OK');
});






















server.listen(5000,()=>{
    console.log("Server running on port 5000")
})
