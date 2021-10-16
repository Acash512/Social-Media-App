const express = require('express')
const app = express()

const {db} = require('./db/models')

const {usersRoute} = require('./routes/users')
const {postsRoute} = require('./routes/posts')
const {commentsRoute} = require('./routes/posts/comments')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))
app.use('/api/users',usersRoute)
app.use('/api/posts',postsRoute)
app.use('/api/comments',commentsRoute)

db.sync().then(function(){
    app.listen(2525,function(){
        console.log('Server started at http://localhost:2525')
    })
})
.catch(function(err){
    console.error(new Error('Failed to start database'))
    console.error(err)
})