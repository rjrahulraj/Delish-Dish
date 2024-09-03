const mongoose=require('mongoose');



const connect_DB=async()=>{
     try {
         return mongoose.connect(process.env.MONGODB_URL);
     } catch (error) {
          console.log(`Error in connection with DB ::${error}`.red);
     }
}

module.exports=connect_DB;