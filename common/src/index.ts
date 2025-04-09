import z from "zod"; 

//SignUp Input
export const  signUpInput = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
})

//SignIn Input
export const  signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
})

//Create Blog Input
export const blogInput = z.object({
    title: z.string(),
    content: z.string(),
})

//Update Blog Input      
export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

//Get Blog Input
export const getBlogInput = z.object({
    id: z.string(),
})

export type SignUpInput = z.infer<typeof signUpInput>
export type SigninInput = z.infer<typeof signinInput>
export type BlogInput = z.infer<typeof blogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type GetBlogInput = z.infer<typeof getBlogInput>
