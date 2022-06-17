const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/Issue')
const Comment = require('../models/Comment')


// get all issues
issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(issues)
    })
})

// get user issues
issueRouter.get('/user', (req, res, next) => {
    Issue.find({user: req.auth._id}, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(issues)
    })
})

// add issue
issueRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// delete issue
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id},
        (err, deleteIssue) => {
            if(err){
                res.status(500)
                return next(err) 
            }
            return res.status(200).send(`Successfully delete issue ${deleteIssue.title}`)
        }
    )
})

// update issue
issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedIssue)
        }
    )
})

// add comment  
// issueRouter.post('/:issueId/comments', (req, res, next) => {
//     const comment = req.body

//     comment.issue = req.params.issueId
//     comment.user = req.auth._id


//     const newComment = new Comment(req.body)
//     newComment.save((err, savedComment) => {
//         if(err){
//             res.status(500)
//             return res.status(200).send(savedComment)
//         }
//     })

//     Issue.findOneAndUpdate(
//         {_id: req.params.issueId},
//         {$push: {comments: newComment}},
//         {new: true}, (err, updatedIssue) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(updatedIssue)
//         }
//     )
// })

module.exports = issueRouter