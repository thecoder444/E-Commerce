const express  = require("express")
const app  = express();
const dotenv  = require("dotenv").config()
const cors = require('cors');
const path = require('path');
const apiRouter  = require("./routes/api")
const mongoose = require("mongoose")

mongoose.connect(process.env.ATLASDB_URL)
.then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{
    console.log(err)
})
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/api", apiRouter)

app.use(cors({
<<<<<<< HEAD
    origin: ['http://localhost:5000', 'http://localhost:5173','https://e-commerce-err0.onrender.com'],
=======
    origin: ['http://localhost:5000', 'http://localhost:5173', 'https://e-commerce-err0.onrender.com' ],
>>>>>>> 8f194511e711aa0c0e3b3b74d76158db49f3945e
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

let port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})
