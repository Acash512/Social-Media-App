const route = require('express').Router()
const {createAnonymousUser} = require('../../controllers/users')

route.post('/',async function(req,res){
    const user = await createAnonymousUser()
    res.status(201).send(user)
})

module.exports = {
    usersRoute:route
}