import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
  } catch (error) {
    console.error(error)
  }
}

// * Función para conectar a la base de datos
// ? connection es una promesa que se resuelve o se rechaza dependiendo de si la conexión se realiza o no
mongoose.connection.on('connected', () => {
  console.log('Mongodb is connected to', mongoose.connection.db.databaseName)
})
