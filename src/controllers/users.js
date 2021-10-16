const {Users} = require('../db/models')
const {genRandomUserName} = require('../utils/username.js')
const {Op} = require('sequelize')

async function createAnonymousUser(){

    let username = genRandomUserName()

    const matchingUserNameCount = await Users.count({
        where:{
            name:{
                [Op.startsWith]:username
            }
        }
    })
    
    if(matchingUserNameCount>0){
        username = `${username}-${matchingUserNameCount+1}`
    }

    const user = await Users.create({
        name:username
    })

    return user
}

module.exports = {
    createAnonymousUser
}