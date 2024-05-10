const {z} = require("zod");
const loginSchema = z.object({
    emailid: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid EmailId"})
    .min(3,{message:"Email must be atleast 3 characteres"})
    .max(255,{message:"Email more than 255 characteres"}),
    password: z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast 6 characteres"})
    .max(1024,{message:"Password can not be greater than 1024 characters"}),  
})
const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 characteres"})
    .max(255,{message:"Name more than 255 characteres"}),
    
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be atleast 10 characteres"})
    .max(20,{message:"Phone more than 20 characteres"}),
  
});

module.exports = {signupSchema, loginSchema};