import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"
const AppBar = () => {
  return (
    <div className="border-b flex justify-around items-center px-10 py-2 ">
      <div className="text-3xl font-black p-1.5 rounded-xl hover:bg-black hover:text-white hover:cursor-pointer">
        <Link to="/blogs">TrekVerse</Link>
      </div>
      <div className="flex text-2xl p-1.5 rounded-xl gap-3">
        <Link to={"/publish"}>
          <div>
            <button className="rounded-xl px-2 py-1 text-black text-sm bg-amber-100 hover:bg-amber-200 hover:cursor-pointer">New Blog</button>
          </div>
        </Link>
        <Avatar authorName="Ashish" />
      </div>
    </div>
  )
}

export default AppBar
