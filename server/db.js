import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

export async function connect() {
  try {
    const db = await mongoose.connect(MONGODB_URI)
    console.log('DB is connected', db.connection.name)
  } catch (error) {
    console.log(error)
  }
}
