var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: String,
    firstname: String,
    lastname: String,
    email: { type: String, unique: true, required: true},
    avatar: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: { type: Boolean, default: false },
    address: String,
    paypal: {
        username: String
    },
    creditCard: {
        cardNumber: String,
        expiredDate: String
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);