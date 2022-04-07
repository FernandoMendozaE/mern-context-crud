import Post from '../model/Post.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js' // ! importando sus funciones de cloudinary
import fs from 'fs-extra' // ! importando librería fs-extra

// * GET /posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.send(posts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// * POST /posts
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    // req.files // ? files: nos permite acceder a los archivos que se subieron

    let image
    // * subiendo la imagen a cloudinary
    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath) // ? eliminando el archivo temporal
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
    }

    const newPost = new Post({ title, description, image })
    await newPost.save()

    res.json(newPost)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

// * PUT /posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// * DELETE /posts/:id
export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndRemove(req.params.id)

    // ? senStatus: nos permite enviar un código de estado http
    if (!postRemoved) return res.sendStatus(404)

    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id)
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// * GET /posts/:id
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.sendStatus(404)
    return res.json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
