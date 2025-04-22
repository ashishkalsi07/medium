import Appbar from "../components/Appbar";
import Fullblog from "../components/fullblog";
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
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    Loading
                </div>
            </div>
        </div>
    }
    return <div>
    <Fullblog blog={blog}/>
    </div>
}

export default Blog;