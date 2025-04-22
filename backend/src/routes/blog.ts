import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { blogInput,updateBlogInput } from "@ashishkalsi07/med-common"; 


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


/*MiddleWare*/
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization')
    if (!header) {
        return c.json({ error: 'Authorization header is missing' }, 401)
    }
    const token = header.split(' ')[1]
    const response = await verify(token, 'mySecretKey') || "";
    console.log("Response ID ", response.id)

    if (response) {
        console.log("Success MiddleWare for Blogs")
        c.set("userId", response.id as string)
        await next()
    } else {
        return c.json({ error: 'UnAuthorized / Invalid token' }, 401)
    }
})


/*Routes */
blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { success } = blogInput.safeParse(body)
        if (!success) {
            return c.json({ error: "Invalid Input" })
        }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId,
            published: true,
        }
    })
    console.log("Blog", blog)
    return c.json({
        message: "Blog created successfully",
        data: blog
    })
})


blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body)
        if (!success) {
            return c.json({ error: "Invalid Input" })
        }
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.update({
        where: { id: body.id },
        data: {
            title: body.title,
            content: body.content
        }
    })
    if (!blog) {
        return c.json({ error: 'Blog not found' }, 404)
    }
    console.log("Updated Blog", blog)
    return c.json({
        message: "Blog updated successfully",
        data: blog
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.findUnique({
        where: { id },
    })
    if (!blog) {
        return c.json({ error: 'Blog not found' }, 404)
    }
    console.log("Blog", blog)
    return c.json({
        message: "Blog fetched successfully",
        data: blog
    })
})

blogRouter.get('/bulk', async (c) => {
    console.log("Entered")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})



