import { v2 as cloudinary } from 'cloudinary' // ! importando módulo cloudinary
import fs from 'fs-extra' // ! importando librería fs-extra
import { CLOUD_NAME, API_KEY, API_SECRET } from '../config.js' // ! importando variables de entorno

// * Configurando cloudinary para subir imágenes
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

// * Función para subir imágenes a cloudinary
export const uploadImage = async filePath => {
  let image = null
  if (filePath) {
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      folder: 'posts' // ? creando una carpeta en cloudinary
    }) // ? subiendo un archivo a cloudinary
    await fs.remove(filePath.tempFilePath) // ? eliminando el archivo temporal
    image = {
      url: result.secure_url,
      public_id: result.public_id
    }
  }
  return image
}

// * Función para eliminar imágenes de cloudinary
export const deleteImage = async id => {
  return await cloudinary.uploader.destroy(id)
}
