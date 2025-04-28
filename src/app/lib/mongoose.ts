import mongoose from 'mongoose'

let isConnected: boolean = false
let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)
    
    if(!process.env.MONGODB_URL){
        throw new Error('MONGODB_URL not found')
    }

    // Si ya estamos conectados, devuelve inmediatamente
    if(isConnected){
        return;
    }
    
    // Si hay una conexión en progreso, espera a que se complete
    if (connectionPromise) {
        return await connectionPromise;
    }

    // Inicia una nueva conexión
    connectionPromise = mongoose.connect(process.env.MONGODB_URL, {
        dbName: 'ELCACIQUE',
        bufferCommands: true, // Cambiado a true para permitir comandos mientras se conecta
        serverSelectionTimeoutMS: 20000, // Incrementado para entornos con mayor latencia
        socketTimeoutMS: 25000,
    });
    
    try {
        await connectionPromise;
        isConnected = true;
        console.log('MongoDB connected successfully');
        return connectionPromise;
    } catch (error) {
        connectionPromise = null;
        console.error('MongoDB connection error:', error);
        throw error;
    }
}