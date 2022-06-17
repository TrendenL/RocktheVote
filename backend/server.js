const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')

// middleware
app.use(express.json())
app.use(morgan('dev'))

// connect to DB
mongoose.connect('mongodb://localhost:27017/rtvdb',
    console.log('connected to DB')
)

// routes
app.use('/auth', require('./routes/authRouter'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issues', require('./routes/issueRouter'))
app.use('/api/comments', require('./routes/commentRouter'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnathorizedError'){
        res.status(err.status)
    }
    res.send({errMsg: err.message})
})

// server
app.listen(9000, () => {
    console.log('The Server is Running on Port 9000')
})