const express = require("express")
const cors = require("cors")

const app = express()

//Routes
const account = require("./routes/account.route")
const moreLost = require("./routes/market.route")

//Middlewares del json
app.use(cors())
app.use(express.json())

//Middleware de routes
app.use("/account", account)
app.use("/moreLost", moreLost)

//General
app.get("/", (request, response) => {
    response.json({ message: "Bienvenido a nuestra API de DISRUPTIVE-TEST" })
})

module.exports = app