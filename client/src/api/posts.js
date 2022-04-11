import axios from 'axios'

export const getPostsRequest = async () => await axios.get('/api/posts')

export const getPostRequest = async id => await axios.get(`/api/posts/${id}`)

export const createPostRequest = async post => {
  const form = createFormData(post)
  return await axios.post('/api/posts', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deletePostRequest = async id => await axios.delete(`/api/posts/${id}`)

export const updatePostRequest = async (id, newPostField) => {
  const form = createFormData(newPostField)
  return await axios.put(`/api/posts/${id}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// * funcion para crear el formulario
const createFormData = post => {
  const form = new FormData()
  // ? construyendo el formulario con los datos del post
  for (const key in post) {
    form.append(key, post[key])
  }
  return form
}
