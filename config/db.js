const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env"});

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex :  true
            })
            console.log("Conectado a base de datos MERN");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;