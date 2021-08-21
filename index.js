const express = require('express')
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const mongoose = require('mongoose')

const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/posts")

const app = express()

dotenv.config()

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}).then(()=>{
    console.log('Database Access Granted')
}).catch((err)=>{
    console.log(err.message)
})

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/auth",authRoute)
app.use('/api/user',userRoute)
app.use("/api/posts",postRoute)

app.get('/',(req,res)=>{
    res.send(`This is homepage`)
})

app.listen(5000,()=>{
    console.log(`Server is up and running`)
})