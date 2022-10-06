require("dotenv").config()
const mongoose = require('mongoose');
const createError = require('http-errors')
const Accounts = require("../models/account.model")
const Market = require("../usecases/market.usecase")
const { Spot } = require("@binance/connector")


// Get All Accounts
const accounts = (filters) => {
    const results = Accounts.find(filters)
    return results
}

// Get account information
const accountInfo = async (id) => {
    const verifyId = new mongoose.Types.ObjectId(id);
    const user = await Accounts.findById(id)
    if(!user) throw createError(401, 'User not found.')
    const client = new Spot(user.apiKey, user.secretKey, { baseURL: process.env.BASE_API_URL })
    const clientResponse = await client.account().then(response => response.data)
    return clientResponse
}


// Place a new order(type LIMIT & to the blockchaing with more lost within 24hrs)
const newOrderLimit = async (id) => {
    const user = await Accounts.findById(id)
    const client = new Spot(user.apiKey, user.secretKey, { baseURL: process.env.BASE_API_URL })
    const moreLost = await Market.moreLost(1)
    const clientResponse = await client.newOrder(moreLost[0].symbol, 'BUY', 'LIMIT', {
        price: '350',
        quantity: 1,
        timeInForce: 'GTC'
      }).then(response => response.data)
        .catch(error => error.message)
        return clientResponse
}


module.exports = { accounts, accountInfo, newOrderLimit }