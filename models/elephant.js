const mongoose = require("mongoose")
const elephantSchema = mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name of elephant can not be blank"]
    },
    Cost: {
        type: Number,
        required: [true, "Elephant cost can not be blank"],
        min: [1000, "elephant cost Should be minimum of $1000 "],
        max: [50000, "elephant cost Cannot be greater than $50000 "]
    },
    Weight: {
        type: Number,
        required: [true, "Weight of the elephant is required"],
        min: [100, "elephant cost Should be minimum of $100 "],
        max: [5000, "elephant cost Cannot be greater than $5000 "]
    }
})
module.exports = mongoose.model("Elephant", elephantSchema)