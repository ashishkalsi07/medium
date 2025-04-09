import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import { signUpInput,signinInput } from "@ashishkalsi07/med-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
      }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const { success } = signUpInput.safeParse(body)
    if (!success) {
        return c.json({ error: "Invalid Input" })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("Request Body", body)

    const user = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password,
        }
    })
    console.log("User", user)

    const secret = 'mySecretKey'
    const token = await sign({ id: user.id }, secret)
    return c.json({ jwt: token })
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if (!success) {
        return c.json({ error: "Invalid Input" })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
    })
    console.log("User", user)
    if (!user) {
        return c.json({ error: "User Not Found" })
    }
    const jwt = await sign({ id: user.id }, 'mySecretKey')
    return c.json({ jwt: jwt })
})