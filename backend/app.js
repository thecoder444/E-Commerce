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
    origin: ['http://localhost:5000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

let port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})
