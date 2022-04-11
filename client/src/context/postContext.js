import { useState, createContext, useContext, useEffect } from 'react'
import {
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  getPostsRequest,
  updatePostRequest
} from '../api/posts'

// * Creando contexto
const postContext = createContext()

// * Creando un hook que permite acceder al contexto el cual se exporta
export const usePosts = () => {
  const context = useContext(postContext)
  if (!context) throw new Error('Post Provider is missing')
  return context
}

export const PostProvider = ({ children }) => {
  // * Creando state
  const [posts, setPosts] = useState([])

  // * Hook que permite ejecutar la función getPosts, al cargar el componente por primera vez y cada vez que se actualice el state
  useEffect(() => {
    ;(async () => {
      const res = await getPostsRequest()
      setPosts(res.data)
    })()
  }, [])

  // * Función que permite agregar un post
  const createPost = async post => {
    try {
      const res = await createPostRequest(post)
      setPosts([...posts, res.data])
    } catch (error) {
      console.error(error)
    }
  }

  // * Función que permite eliminar un post
  const deletePost = async id => {
    const res = await deletePostRequest(id)
    if (res.status === 204) {
      setPosts(posts.filter(post => post._id !== id))
    }
  }

  // * Función que permite obtener un post
  const getPost = async id => {
    try {
      const res = await getPostRequest(id)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  // * Función que permite actualizar un post
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post)
      setPosts(posts.map(post => (post._id === id ? res.data : post)))
    } catch (error) {
      console.error(error)
    }
  }

  // ? postContext.Provider: es el contenedor de los datos, los componentes hijos pueden acceder a ellos
  return (
    <postContext.Provider
      value={{
        posts,
        createPost,
        deletePost,
        getPost,
        updatePost
      }}
    >
      {children}
    </postContext.Provider>
  )
}
