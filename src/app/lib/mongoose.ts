import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true)
    if(!process.env.MONGODB_URL){
        return console.log('MONGODB_URL not found')}

    if(isConnected){
       return ;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'ELCACIQUE',
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,  // Aumenta a 10 segundos
            socketTimeoutMS: 30000,           // Aumenta a 30 segundos
            connectTimeoutMS: 10000,          // Aumenta a 10 segundos
            maxPoolSize: 10,                  // Limita el pool de conexiones
        })
        isConnected = true 
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}