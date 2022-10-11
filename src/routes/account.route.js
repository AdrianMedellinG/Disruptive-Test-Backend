const express = require("express")
const { accounts, accountInfo, newOrderLimit, createUser, accountInfoNoMongo } = require("../usecases/accout.usecase")

//Endpoints
const router = express.Router()

router.get("/getAll", async (request, response) => {
    try {
        const { query } = request
        const data = await accounts(query)
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


router.get("/:id", async (request, response) => {
    try {
        const { params } = request
        const data = await accountInfo(params.id)
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


router.post("/", async (request, response) => {
    const { body } = request
    try {
        const user = await createUser(body)
        response.status(201)
        response.json({
            success: true,
            data: {
                user
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.get("/", async (request, response) => {
    try {
        const { query } = request
        const data = await accountInfoNoMongo(query)
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