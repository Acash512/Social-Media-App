const route = require('express').Router()
const {addComment,showAllCommentsForPost} = require('../../controllers/comments')

route.post('/add',async function(req,res){
    const {body,userId,postId} = req.body
    
    if((!body) || (!userId) || (!postId)){
        return res.status(400).send({
            error:'body, userId and postId are required to add a comment'
        })
    }

    const comment = await addComment(body,userId,postId)
    res.status(201).send(comment)
})

route.post('/show',async function(req,res){
    const {postId} = req.body

    if(!postId){
        return res.status(400).send({
            error:'postId is required to show comments'
        })
    }

    const comments = await showAllCommentsForPost(postId)
    res.status(200).send(comments)
})

module.exports = {
    commentsRoute:route
}