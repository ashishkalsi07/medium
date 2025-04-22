import AppBar from "./AppBar";
import Spinner from "./Spinner";

interface BlogData {
  title?: string;
  authorId?: string;
  content?: string;
}

interface FullCardBlog {
  blog: any; 
}

const FullBlog = ({ blog }: FullCardBlog) => {
  if (!blog) {
    return <Spinner/>
  }

  const blogData: BlogData = blog.data ? blog.data : blog;

  console.log("Blog Data:", blogData); 
  if (!blogData.title) {
    return <Spinner/>
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <AppBar />
      <div className="flex justify-center py-8 px-8 bg-stone-100">
        <div className="w-full bg-white rounded-lg shadow-md p-8 ">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blogData.title}</h1>
          <div className="text-gray-700 leading-relaxed">{blogData.content}</div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;