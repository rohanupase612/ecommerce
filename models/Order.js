const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
    orderdate: {
        type: String,
        require: true
    },
    productid: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobileno: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    pincode: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    place: {
        type: String,
        require: true
    },
    shipping: {
        type: String,
        require: true
    },
    total: {
        type: String,
        require: true
    },
    status: {
        type: String,
        // require: true
    },



});
const Orders = mongoose.model("orders", schema);
module.exports = Orders;