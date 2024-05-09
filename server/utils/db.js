const mongoose = require("mongoose")

const URI = "mongodb://127.0.0.1:27017/dashboard"
const dbconnect  = async()=>{
    try {
       await mongoose.connect(URI)
       console.log("DB Connection successful")
    } catch (error) {
        console.log(error)
    }
}

module.exports =  dbconnect;