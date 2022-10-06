const mongoose = require("mongoose")

var profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    profile: profileSchema,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("accounts", accountSchema)