require("dotenv").config()
const createError = require('http-errors')
const Accounts = require("../models/account.model")
const market = require("../usecases/market.usecase")
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
    const clientResponse = await client.account().then(response => response.data)
    return clientResponse
}


// Place a new order
const newOrderLimit = async (id, query) => {
    const user = await Accounts.findById(id)
    const client = new Spot(user.apiKey, user.secretKey, { baseURL: process.env.BASE_API_URL })
    const moreLost = await market.moreLost(1)
    console.log(moreLost[0].symbol)
    client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
        price: '350',
        quantity: 1,
        timeInForce: 'GTC'
      }).then(response => response.data)
        .catch(error => client.logger.error(error))

}


module.exports = { accounts, accountInfo, newOrderLimit }