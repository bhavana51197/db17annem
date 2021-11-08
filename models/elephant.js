const mongoose = require("mongoose")
const elephantSchema = mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name of elephant can not be blank"]
    },
    Cost: {
        type: Number,
        required: [true, "Elephant cost can not be blank"]
    },
    Weight: {
        type: Number,
        required: [true, "Weight of the elephant is required"]

    }
})
module.exports = mongoose.model("Elephant", elephantSchema)