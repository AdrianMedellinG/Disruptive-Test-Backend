const express = require("express")
const { moreLost } = require("../usecases/market.usecase")

//Endpoints
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        
        const data = await moreLost()
        response.json({
            sucess: true, 
            data
        })
    }catch(error) {
        response.status(400)
        response.json({
            sucess: false, 
            message: error.message
        })
    }
})


module.exports = router