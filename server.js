const express = require('express')
const bodyparser=require('body-parser')
const app = express()
const ejs = require('ejs')
// const swaggerUi = require('swagger-ui-express')
// swaggerDocument = require('./swagger.json');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// const port = 3000
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
const dbConfig = require('./database/database.config');
const mongoose = require('mongoose');
const {router} = require("express/lib/application");

const authRoute = require('./routes/authRoute')

app.use('/auth',authRoute)
const {response} = require("express");


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


const OperationRoute = require('./routes/OperationRoute')

app.use('/user',OperationRoute)

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

app.get('/', (_, res) => {
    // res.sendFile(`${__dirname}/index.ejs`, null, (err) => {
    //     if (err) console.error(err)
    // })
    res.render('index');

})

app.get('/results', (req, res) => {
    res.render('results');
});
app.get('/delete', (req, res) => {
    res.render('delete');
});

app.get('/update', (req, res) => {
    res.render('update');
});
let port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});