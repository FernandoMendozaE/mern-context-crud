import { usePosts } from '../context/postContext' // ! importando el hook
import { VscEmptyWindow } from 'react-icons/vsc' // ! importando icono
import { Link } from 'react-router-dom' // ! importando Link para redireccionar
import { PostCard } from '../components/PostCard' // ! importando el componente PostCard

export function HomePage() {
  const { posts } = usePosts() // ? usando el hook

  if (posts.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl">There are no posts</h1>
      </div>
    )
  return (
    <div className="text-white">
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-gray-300 font-bold">Posts ({posts.length})</h1>
        <Link to="/new" className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">
          {' '}
          Create New Post
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
