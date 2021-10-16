const {Comments,Users} = require('../db/models')

async function postComment(body,userId,postId){
    const comment = Comments.create({
        body,
        userId,
        postId
    })

    return comment
}

async function showAllCommentsForPost(postId){
    const comments = Comments.findAll({
        include:[Users],
        where:{postId}
    })

    return comments
}