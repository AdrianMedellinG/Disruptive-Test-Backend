const fetch = require("node-fetch");
globalThis.fetch = fetch


function sortNumber(a, b) {
    return a.priceChange - b.priceChange;
}

// Get 24hr more value lost of blockchaing
const moreLost = () => {
    return fetch("https://api.binance.com/api/v3/ticker/24hr")
        .then((res) => {
            return res.json()
        })
        .then((res) => res.sort(sortNumber).slice(0, 10))
        .catch((error) => {
            console.log(error)
        })
}

module.exports = { moreLost }