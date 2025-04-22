"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogInput = exports.updateBlogInput = exports.blogInput = exports.signinInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
//SignUp Input
exports.signUpInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string(),
});
//SignIn Input
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
//Create Blog Input
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
//Update Blog Input      
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
//Get Blog Input
exports.getBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
});
