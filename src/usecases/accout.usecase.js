require("dotenv").config()
const Accounts = require("../models/account.model")
const { Spot } = require("@binance/connector")


// Get All Accounts
const accounts = (filters) => { 
    const results = Accounts.find(filters)
    return results
}

// Get account information
const accountInfo = async (id) => { 
    const user = await Accounts.findById(id)
    const client = new Spot(user.apiKey, user.secretKey, { baseURL: process.env.BASE_API_URL })
    return client.account().then(response => response.data)
}

module.exports = { accounts, accountInfo }