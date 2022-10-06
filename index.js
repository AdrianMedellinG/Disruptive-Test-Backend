require('dotenv').config()
const app = require("./src/server")
const mongoose = require('mongoose')

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
} = process.env
const PORT = process.env.PORT || 8080;
console.log(PORT)
const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

//Conectando a base de datos
mongoose.connect(URL)
.then(()=>{
    console.log("Conectado a la base de datos de mongo")
    //Levantando el server
    app.listen(PORT, () =>{
        console.log("Server Listening on port:", PORT)
    })
})
.catch((error)=>{
    console.log("Error",error)
})