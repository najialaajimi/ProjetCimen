const { default: mongoose } = require("mongoose")

const dbConnect =  async () =>{
    try{
        await mongoose.connect(process.env.mongo_db);
    }catch(error){
        console.log("Database error")
    }
}
module.exports= dbConnect;