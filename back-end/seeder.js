const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const {products} = require('./data/products')
const {users} = require('./data/users')

const User = require('./model/userModel')
const Product = require('./model/productModel')
const Order = require('./model/orderModel')

const {connectDB} = require('./config/db')

dotenv.config({ path: './config.env' })

connectDB()

console.log('trying...')

const importData = async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map(product =>{
            return {...product, user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse)
        process.exit()
    }catch(err){
        console.log(`${err.message}`.red.inverse)
        process.exit()
    }
}

const destroyData = async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed'.red.bold)
        process.exit()
    }catch(err){
        console.log(`${err.message}`.red.inverse)
        process.exit()
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}