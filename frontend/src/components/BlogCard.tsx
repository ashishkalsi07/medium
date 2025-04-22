import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}
const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    return (<Link to={`/blog/${id}`}>
        <div>
            <div className="flex p-2">
                <div className="">
                    <Avatar authorName={authorName} />
                </div>
                <div className="flex items-center">
                    <div className="font-light pl-1">
                        {authorName}
                    </div>
                    <div className="pl-1 pb-1 text-sm">&#9679;</div>
                </div>
                <div className="pl-1 font-thin text-slate-500 mt-2">
                    {publishedDate}
                </div>
            </div>
            <div className="px-2 pt-1 font-bold text-xl">
                {title}
            </div>
            <div className="px-2 font-light text-slate-500 text-lg ">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="flex justify-between px-2 py-4">
                <div>
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
                <div className="flex gap-4">
                    <div>
                        <svg className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </div>
                    <div>
                        <svg className="h-6 w-6 text-slate-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />  <line x1="12" y1="12" x2="12" y2="12.01" />  <line x1="8" y1="12" x2="8" y2="12.01" />  <line x1="16" y1="12" x2="16" y2="12.01" /></svg>
                    </div>
                    <div>
                        <svg className="h-6 w-6 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" />  <circle cx="5" cy="12" r="1" /></svg>
                    </div>
                </div>
            </div>
            <div className="bg-slate-200 h-1 w-full ">

            </div>

        </div>
    </Link>
    )
}
export function Avatar({ authorName }: { authorName: string }) {
    return (
        <div>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
            </div>
        </div>
    )
}

export default BlogCard
