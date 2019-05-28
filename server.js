const express = require('express');
const app = express();

const messages = Array()
const colorName = Array()

app.use("/", express.static('public'))
app.get("/rand", (req, res)=>{
    messages.unshift({ 
        name: req.query.name, 
        msg: req.query.msg 
    })
    console.log("Updated messages list:");
    console.log(messages)
    res.send(JSON.stringify(messages))
})

app.get("/auth", (req, res) => {
    console.log(req.query);
    messages.unshift({ 
        name: req.query.names, 
        msg: "---connected---" 
    })
    res.send(messages)
})

app.get('/update', (req, res) => {
    res.send(messages)
})

app.listen(81);