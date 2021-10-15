const Sequelize = require('sequelize')
const Datatypes = Sequelize.DataTypes

const db = new Sequelize({
    database:'social_media_db',
    username:'sample_user',
    password:'samplepass',
    dialect:'mysql'
})

const COL_ID_DEF = {
    type:Datatypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
}

const COL_USERNAME_DEF = {
    type:Datatypes.STRING(30),
    unique:true,
    allowNull:false
}

const COL_TITLE_DEF = {
    type:Datatypes.TEXT('tiny'),
    allowNull:false
}

const Users = db.define('user',{
    id:COL_ID_DEF,
    name:COL_USERNAME_DEF
})

const Posts = db.define('post',{
    id:COL_ID_DEF,
    title:COL_TITLE_DEF,
    body:{
        type:Datatypes.TEXT,
        allowNull:false
    }
})

const Comments = db.define('comment',{
    id:COL_ID_DEF,
    body:{
        type:Datatypes.TEXT('tiny'),
        allowNull:false
    }
})

Posts.belongsTo(Users)
Comments.belongsTo(Users)
Comments.belongsTo(Posts)

Users.hasMany(Posts)
Users.hasMany(Comments)
Posts.hasMany(Comments)

module.exports = {
    db,
    Users,
    Posts,
    Comments
}