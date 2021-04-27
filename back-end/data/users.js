
const bcrypt = require('bcryptjs')

exports.users = [
    {
        name:"Dakota",
        email:"dakota@vikings.com",
        password:bcrypt.hashSync('12345',10),
    },{
        name:"Jeni",
        email:"jeni@vikings.com",
        isAdmin:true,
        password:bcrypt.hashSync('12345',10),
    },{
        name:"Amber",
        email:"amber@vikings.com",
        password:bcrypt.hashSync('12345',10),
    }
]