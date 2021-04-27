const mongoose = require('mongoose')

exports.connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE,{
            useCreateIndex:true,
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useFindAndModify:false,
        })

        console.log(`DB Connection Successful: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(`Something went wrong: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}