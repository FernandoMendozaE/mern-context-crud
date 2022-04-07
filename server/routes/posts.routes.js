import { Router } from 'express' // ! importando express para crear una instancia de Router
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPost
} from '../controllers/posts.controllers.js' // ! importando los controladores

const router = Router()

router.get('/posts', getPosts)

router.post('/posts', createPost)

router.put('/posts/:id', updatePost)

router.delete('/posts/:id', deletePost)

router.get('/posts/:id', getPost)

export default router
