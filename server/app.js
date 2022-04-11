import express from 'express' // ! importando express
import postsRoutes from './routes/posts.routes.js' // ! importando las rutas
import fileUpload from 'express-fileupload' // ! importando módulo fileUpload
import morgan from 'morgan' // ! importando módulo morgan
import { dirname, join } from 'path' // ! importando módulo path
import { fileURLToPath } from 'url' // ! importando módulo url

const app = express() // ? creando una instancia de express

// * middleware
app.use(morgan('dev')) // ? usando morgan para mostrar logs
app.use(express.json()) // ? usando middleware para que acepte json
app.use(express.json()) // ? express.json(); para que express entienda los datos en formato json

app.use(
  fileUpload({
    useTempFiles: true, // ? para que el archivo se guarde en el directorio temporal
    tempFileDir: './upload/' // ? para que el archivo se guarde en el directorio temporal
  })
) // ? express-fileupload para que express entienda los archivos

// * routes
app.use('/api', postsRoutes) // ? usando las rutas

// * Configuraciones para que express entienda archivos estáticos para desplegar en producción
const __dirname = dirname(fileURLToPath(import.meta.url)) // ? obteniendo el directorio del archivo
app.use(express.static(join(__dirname, '../client/build'))) // ? usando el directorio publico para que express entienda los archivos estaticos

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/build/index.html')) // ? enviando el index.html para que express entienda los archivos estaticos
})

export default app
