import { v2 as cloudinary } from 'cloudinary' // ! importando módulo cloudinary

// * Configurando cloudinary para subir imágenes
cloudinary.config({
  cloud_name: 'deqnmn50h',
  api_key: '563721284152585',
  api_secret: '_wyTCD42cCFarVeZSaF7REqLtgU'
})

// * Función para subir imágenes a cloudinary
export const uploadImage = async filePath => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'posts' // ? creando una carpeta en cloudinary
  }) // ? subiendo un archivo a cloudinary
}

// * Función para eliminar imágenes de cloudinary
export const deleteImage = async id => {
  return await cloudinary.uploader.destroy(id)
}
