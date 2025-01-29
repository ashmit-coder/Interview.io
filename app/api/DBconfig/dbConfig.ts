import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('MONGO DB Connected')
        })
    }catch (error) {
        console.log("Error Occured")
        console.log(error)
    }
}