const express = require("express")
const { accounts, accountInfo, newOrderLimit } = require("../usecases/accout.usecase")

//Endpoints
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        const { query } = request
        const data = await accounts(query)
        response.json({
            sucess: true,
            account
        })
    } catch (error) {
        response.status(400)
        response.json({
            sucess: false,
            message: error.message
        })
    }
})


router.get("/:id", async (request, response) => {
    try {
        const { params } = request
        const data = await accountInfo(params.id)
        response.json({
            sucess: true,
            account
        })
    } catch (error) {
        response.status(400)
        response.json({
            sucess: false,
            message: error.message
        })
    }
})

router.post("/:id", async (request, response) => {
    try {
        const { params } = request
        const data = await newOrderLimit(params.id)
        response.json({
            sucess: true,
            data
        })
    } catch (error) {
        response.status(400)
        response.json({
            sucess: false,
            message: error.message
        })
    }
})

module.exports = router