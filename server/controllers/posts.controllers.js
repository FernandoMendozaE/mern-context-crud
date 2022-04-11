import Post from '../model/Post.js'
import { uploadImage, deleteImage } from '../libs/cloudinary.js' // ! importando sus funciones de cloudinary

// * GET /posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
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

// * POST /posts
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    // req.files // ? files: nos permite acceder a los archivos que se subieron

    const image = await uploadImage(req.files?.image)

    const newPost = new Post({ title, description, image })
    await newPost.save()

    res.json(newPost)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// * PUT /posts/:id
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params

    const postUpdate = await Post.findById(id)
    let imageUpdate = null
    if (postUpdate) {
      const { image } = postUpdate
      if (image.public_id) await deleteImage(image.public_id) // ? eliminando la imagen anterior
      imageUpdate = await uploadImage(req.files?.image) // ? subiendo la nueva imagen
    }

    const post = await Post.findByIdAndUpdate(
      id,
      { $set: { ...req.body, image: imageUpdate } },
      {
        new: true
      }
    )
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
