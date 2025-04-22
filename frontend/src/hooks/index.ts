import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blogs{
        "content":string,
        "title": string,
        "id":string
        "author": {
            "name": string
        },
        "publishedDate":string
}
export interface Blog{
    "message": string
    "data": {
        "id": string
        "title": string
        "content": string
        "published": BooleanConstructor,
        "authorId": string
    }
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([])

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }).then(response=>{ console.log("Response",response.data)
                 setBlogs(response.data.blogs);setLoading(false);})    
        } catch (error) {
            console.log(error)
        }
        
    },[])

    return {
        loading,
        blogs
    }
}
export const useBlog =({id}:{id:string})=>{
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog[]>([])

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }).then(response=>{ console.log("Response",response.data)
                 setBlog(response.data);setLoading(false);})    
        } catch (error) {
            console.log(error)
        }
        
    },[id])

    return {
        loading,
        blog
    }
    
}