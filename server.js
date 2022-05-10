const express = require('express')
const bodyparser=require('body-parser')
const app = express()
const port = 1234

const https = require('https');
const {response} = require("express");
// var campgroundRoutes = require("./routes/")

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

app.get('/', (_, res) => {
    res.sendFile(`${__dirname}/index.html`, null, (err) => {
        if (err) console.error(err)
    })

})

app.get('/map', (_, res) => {
    res.sendFile(`${__dirname}/public/project.html`, null, (err) => {
        if (err) console.error(err)
    })

})
app.get('/recommend', (req, res) => {
    res.sendFile(`${__dirname}/public/recommend.html`, null, (err) =>{
        if (err) console.error(err)
    })
})






app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})