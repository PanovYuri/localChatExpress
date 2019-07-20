const express = require('express');
const app = express();

const messages = Array()

app.use("/", express.static('public'))
app.get("/rand", (req, res) => {
    messages.unshift({
        name: req.query.name,
        msg: req.query.msg
    })
    res.send(JSON.stringify(messages))
})

app.get("/auth", (req, res) => {
    messages.unshift({
        name: req.query.names,
        msg: "---connected---"
    })
    console.log(`User connected ${req.query.names}`);
    res.send(messages)
})

app.get('/update', (req, res) => {
    res.send(messages)
})

app.listen(82);