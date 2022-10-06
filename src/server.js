const express = require("express")
const cors = require('cors')

const app = express()

//Routes
const accountInfo = require("./routes/accountInfo.route")

//Middlewares del json
app.use(cors())
app.use(express.json())

//Middleware de routes
app.use("/accountInfo", accountInfo)

//General
app.get("/", (request, response)=>{
    response.json({message: "Bienvenido a nuestra API de DISRUPTIVE-TEST"})
})

module.exports = app