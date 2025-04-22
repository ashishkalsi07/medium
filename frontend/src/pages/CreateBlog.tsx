import { BACKEND_URL } from "../config";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const response = await fetch(`${BACKEND_URL}/api/v1/blog`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    console.log("response",data);
    navigate(`/blog/${data.data.id}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Title:', title);
    console.log('Content:', content);
    setTitle('');
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-black">Create New Blog</h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="mt-1 block w-full bg-black/20 text-black border border-gray-700 rounded-md py-2 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-black">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={8}
              className="mt-1 block w-full bg-black/20 text-black border border-gray-700 rounded-md py-2 px-3 placeholder:text-gray-400 focus:outline-none focus:border-transparent transition-all duration-300 resize-y min-h-[200px]"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-black text-white font-semibold py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-purple-500/50'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Blog'}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
