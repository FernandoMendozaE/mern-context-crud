import toast from 'react-hot-toast'
import { usePosts } from '../context/postContext'
import { useNavigate } from 'react-router-dom'

export function PostCard({ post }) {
  // * Llamando al hook con el contexto
  const { deletePost } = usePosts()

  // * instanciando el hook de navegación
  const navigate = useNavigate()

  // * Creando una función que permite eliminar un post
  const handleDelete = id => {
    // * toast es una funcion que se puede usar para mostrar mensajes
    toast(
      t => (
        <div>
          <p className="text-white">
            {console.log(post)}
            Do you want to delete <strong>{post.title}</strong>?
          </p>
          <div className="flex justify-center py-2">
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-md mx-2"
              onClick={async () => {
                const toastId = toast.loading('Deleting...')
                await deletePost(id)
                toast.dismiss(toastId)
                toast.dismiss(t.id) // ? se ejecuta la funcion toast.dismiss para que el mensaje desaparezca
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-md mx-2"
              onClick={() => toast.dismiss(t.id)} // ? cerrar el toast, se puede usar t.id para cerrar el toast
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        // duration: '4000',
        style: {
          background: '#202020'
        }
      }
    )
  }

  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={e => {
              e.stopPropagation() // ? evita que se ejecute el onClick  del padre (PostCard)
              handleDelete(post._id)
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-400">{post.description}</p>
      </div>
      {post.image && <img src={post.image.url} alt="" className="object-cover h-96 w-full" />}
    </div>
  )
}
