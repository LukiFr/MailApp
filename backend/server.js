const app = require('express')();
const bodyParser = require('body-parser')
const cors = require("cors");
const mongoose = require('mongoose');

const User = require('./model/user.js');
const Message = require('./model/message.js');

const PORT = 9000;

const jsonParser = bodyParser.json();

const url =
    "mongodb+srv://Wwsi123:Wwsi123@cluster0.rbbsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "Cluster0";

async function main() {
    await mongoose.connect(url);
}

main()
    .then(
        app.listen(PORT, () => {
            console.log(`Node.js app is listening at http://localhost:${PORT}`);
        })
    )
    .catch(err => console.log(err));

app.use(cors())


app.post("/login", jsonParser, async (req, res) => {

    try {
        const { username } = req.body

        const user = await User.findOne({ username }).lean()

        if (user) {
            res.status(200).send({ username: username })
        } else {
            const response = await User.create({
                username: username
            })
            res.status(200).send({ username: response.username })
        }

    } catch (e) {

        console.log(e)

    }
})

app.get("/users", jsonParser, async (req, res) => {

    try {

        const users = await User.find({})
        res.status(200).send({ users })

    } catch (e) {

        console.log(e)

    }

})

app.get("/messages", jsonParser, async (req, res) => {

    try {

        const { username } = req.query
        const messages = await Message.find({ receipient: username }).exec();

        res.status(200).send({ messages })

    } catch (e) {

        console.log(e)

    }
})

app.post("/message", jsonParser, async (req, res) => {

    try {

        const { sender, receipient, message } = req.body
        await Message.create({
            sender: sender,
            receipient: receipient,
            message: message
        })

        res.status(200)

    } catch (e) {

        console.log(e)

    }
})



