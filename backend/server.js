const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./routes/user")

const connectWithDatabase = async () => {
    try {
        const res = await mongoose
            .connect(process.env.MONGO_URI)
        console.log("connected with database");
    } catch (err)
    {
        console.log(err)
    }

}


connectWithDatabase();

app.use(cors())



app.use(express.json());

 app.use('/user', userRoute);


app.get("/", (req, res) => {
    console.log("getting request from client");
    res.json("helllllllloooooooooooooooo");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {console.log(PORT)})