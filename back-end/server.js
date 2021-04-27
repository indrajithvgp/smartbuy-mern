const express = require('express')
const colors = require('colors')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {connectDB} = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

dotenv.config({ path: './config.env' })

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())



app.use('/api/products', productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, '../front-end/build')))

    app.get( '*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname,'front-end','build','index.html'));
    })

}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(` Server running in ${process.env.NODE_ENV} MODE on Port ${PORT} ... `.yellow.bold)
})