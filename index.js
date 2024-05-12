require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utility/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
<<<<<<< HEAD
    origin:["http://localhost:5174","http://localhost:5173"],
=======
    origin:["http://localhost:5174",http://localhost:5173"],
>>>>>>> 4599923499041e67c7b91adc32e8de9df24c2e42
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use("/", authRouter);
app.use("/form", contactRoute);
app.use(errorMiddleware);
//app.use("/api/auth", router);
const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port : ${PORT}`);
    });
});
