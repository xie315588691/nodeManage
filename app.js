const express = require('express')
var cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router.js')

var app = express()


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:8080'],  //指定接收的地址
    methods: ['GET', 'POST'],  //指定接收的请求类型
    alloweHeaders: ['Content-Type', 'Authorization']  //指定header
}))
app.use(session({
    secret: 'xiaoxin',
    resave: false,
    saveUninitialized: false
}))

app.use(router);

app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen('8081', () => {
    console.log("node is running");
})