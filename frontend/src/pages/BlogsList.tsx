import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'
import Spinner from '../components/Spinner'
const Blog = () => {
  const {loading,blogs}= useBlogs()
  if(loading || !blogs) return <Spinner/>
  
  return (
    <div className='bg-stone-100 min-h-screen'>
      <div className='pb-5'>
        <AppBar />
      </div>
      <div className='flex justify-center'>
        <div className='min-w-lg max-w-7xl cursor-pointer'>
          {
            blogs.map(blog => {
              const currentdate = new Date();
              return (
                <BlogCard 
                  authorName={blog.author.name} 
                  title={blog.title} 
                  content={blog.content} 
                  publishedDate={currentdate.toLocaleDateString()}
                  id={blog.id} 
                />
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Blog
