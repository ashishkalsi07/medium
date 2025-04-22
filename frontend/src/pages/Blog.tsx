import AppBar from "../components/AppBar";
import FullBlog from "../components/Fullblog";
import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";

const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    console.log("Blog",blog)
    if ( loading || !blog) {
        return <div>
            <AppBar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    Loading
                </div>
            </div>
        </div>
    }
    return <div>
    <FullBlog blog={blog}/>
    </div>
}

export default Blog;