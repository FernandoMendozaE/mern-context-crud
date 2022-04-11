import { usePosts } from '../context/postContext' // ! importando el hook context
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from 'formik' // ! importando formik el cual nos permite crear un formulario reactivo y validarlo
import * as Yup from 'yup' // ! importando yup para validar el formulario
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts() // ? usando el hook context para crear un post
  const navigate = useNavigate() // ? usando el hook navigate para redireccionar a la ruta /posts
  const params = useParams() // ? usando el hook params para obtener el id del post
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null
  }) // ? usando el hook state para obtener el post

  useEffect(() => {
    ;(async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setPost(post)
      }
    })()
  }, [params.id, getPost]) // ? usando el hook useEffect para obtener el post

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>

        <Formik
          // ? initialValues: es el valor inicial del formulario
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required').trim(),
            description: Yup.string().required('Description is required').trim()
          })}
          // ? onSubmit: es la función que se ejecuta al enviar el formulario
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values)
            } else {
              await createPost(values)
            }
            actions.setSubmitting(false) // ? se ejeucta la función setSubmitting para que el formulario no se envie dos veces
            navigate('/')
          }}
          // ? enableReinitialize: permite reiniciar el formulario
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="title" className="text-sm block font-bold text-gray-400">
                Title
              </label>
              {/* ? Field: es el componente que permite crear un input 
              /* component='p' es el componente que se renderiza en el lugar del input
            */}
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage className="text-red-400 text-sm" name="title" component="p" />

              <label htmlFor="title" className="text-sm block font-bold text-gray-400">
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                rows={3}
              />
              <ErrorMessage className="text-red-400 text-sm" name="description" component="p" />

              <label htmlFor="title" className="text-sm block font-bold text-gray-400">
                Description
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={e => setFieldValue('image', e.target.files[0])}
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting} // ? disabled es una propiedad que permite deshabilitar el botón
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  'Save'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
