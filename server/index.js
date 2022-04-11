import { PORT } from './config.js' // ! importando variables de entorno
import { connectDB } from './db.js' // ! importando la conexión a la base de datos
import app from './app.js' // ! importando el servidor

connectDB() // ? conectando a la base de datos
app.listen(PORT)
console.log('Server is running on port', PORT)
