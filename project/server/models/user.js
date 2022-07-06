//Create Models to access the dataBase.
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//mongoDB doesn't allow us to make schemas thats why we use mongoose schema.
const userSchema = new mongoose.Schema(
    //first argument setting objects.
    {
        name: String,
        email: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            default: "subscriber",
        },
        cart:{
            type: Array,
            default: [],
        },
        address: String,
        //We can also reffer to the other model by using the ref.
        wishlist: [{ type: ObjectId, ref: "Product" }],
    },
    //second argument timestamps will automatically add Created At Updated At.
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);