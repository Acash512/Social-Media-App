const express = require('express')
const app = express()

const {db} = require('./db/models')

db.sync().then(function(){
    app.listen(2525,function(){
        console.log('Server started at http://localhost:2525')
    })
})
.catch(function(err){
    console.error(new Error('Failed to start database'))
    console.error(err)
})