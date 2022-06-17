const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment')

// add comment
commentRouter.post('/:issueId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    req.body.issue = req.params.issueId

    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedComment)
    })
})

// get comments
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// get comment by issue
commentRouter.get('/:issueId', (req, res, next) => {
    Comment.find({issue: req.params.issueId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// delete comment

module.exports = commentRouter