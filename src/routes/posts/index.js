const route = require('express').Router()
const {createNewPost,showAllPosts,showAllPostsForUser} = require('../../controllers/posts')

route.get('/',async function(req,res){
    const posts = await showAllPosts()
    res.status(200).send(posts)
})

route.get('/:userId',async function(req,res){
    const {userId} = req.params
    
    if(!userId){
        return res.status(400).send({
            error:"userId is required to fetch posts"
        })
    }

    const posts = await showAllPostsForUser(userId)
    res.status(200).send(posts)
})

route.post('/',async function(req,res){
    const {title,body,userId} = req.body
    
    if((!userId) || (!title) || (!body)){
        return res.status(400).send({
            error:'title, body and userId are required to create a post'
        })
    }
    
    const post = await createNewPost(title,body,userId)
    res.status(201).send(post)
})

module.exports = {
    postsRoute:route
}