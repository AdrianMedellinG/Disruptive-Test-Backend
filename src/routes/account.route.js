const express = require("express")
const { accounts, accountInfo, newOrderLimit } = require("../usecases/accout.usecase")

//Endpoints
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        const{query} = request
        const account = await accounts(query)
        response.json({
            sucess: true, 
            data: {
                account
            }
        })
    }catch(error) {
        response.status(400)
        response.json({
            sucess: false, 
            message: error.message
        })
    }
})


router.get("/:id", async (request, response) => {
    try {
        const { params} = request
        const account = await accountInfo(params.id)
        response.json({
            sucess: true, 
            data: {
                account
            }
        })
    }catch(error) {
        response.status(400)
        response.json({
            sucess: false, 
            message: error.message
        })
    }
})

router.post("/:id", async (request, response) => {
    try {
        const { query, params } = request
        const account = await newOrderLimit(params.id, query)
        response.json({
            sucess: true, 
            data: {
                account
            }
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