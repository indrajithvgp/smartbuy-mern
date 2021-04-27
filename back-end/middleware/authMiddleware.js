const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

exports.protect = asyncHandler(async(req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    }{
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await User.findById(decoded.id).select('-password')
        }catch(err){
            res.status(401)
            throw new Error("Not Authorized, TOKEN FAILED")
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized')
    }
    next()
})

exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }