const {Posts,Users} = require('../db/models')

async function createNewPost(title,body,userId){
    const post = await Posts.create({
        title,
        body,
        userId
    })

    return post
}

async function showAllPosts(){
    const posts = await Posts.findAll({
        include:[Users]
    })

    return posts
}

async function showAllPostsForUser(userId){
    const posts = await Posts.findAll({
        where:{userId}
    })

    return posts 
}

module.exports = {
    createNewPost,
    showAllPosts,
    showAllPostsForUser
}