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
  if (!user) throw createError(401, 'User not found.')
  const client = new Spot(user.apiKey, user.secretKey, { baseURL: process.env.BASE_API_URL })
  const clientResponse = await client.account().then(response => response.data)
  return clientResponse
}

// Place a new order(type LIMIT & to the blockchaing with more lost within 24hrs)
const newOrderLimit = async (id) => {
  const user = await Accounts.findById(id)
  const client = new Spot(user.apiKey, user.secretKey, { baseURL: 'https://testnet.binance.vision' })
  const moreLost = await Market.moreLost(1)
  //on DEV use 'BNBUSDT' // on production change to moreLost[0].symbol
  const clientResponse = client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
    price: '350',
    quantity: 1,
    timeInForce: 'GTC'
  }).then(response => response.data)
    .catch(error => error.message)
  return clientResponse
}

// Create User
const createUser = async (userData) => {
  const user = Accounts.create(userData)
  return user
}

// Get account information WITHOUT MONGO ID
const accountInfoNoMongo = async (params) => {
  const client = new Spot(params.apiKey, params.secretKey, { baseURL: process.env.BASE_API_URL })
  const clientResponse = await client.account().then(response => response.data)
  return clientResponse
}

module.exports = { accounts, accountInfo, newOrderLimit, createUser, accountInfoNoMongo }