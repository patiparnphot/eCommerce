var mongoose = require("mongoose");

var orderObject = {
   invoiceId: { type: String, unique: true, required: true },
   goods: [
      {
         title: String,
         description: String,
         image: String,
         category: String,
         key: String,
         specificDetail: String,
         amount: Number,
         costPerUnit: Number,
         cost: Number
      }
   ],
   customer: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      firstname: String,
      lastname: String,
      address: String,
      email: String,
      telephone: String,
      lineIdCustomer: String
   },
   subTotal: Number,
   delivereeFee: Number,
   total: Number,
   approve: { type: Boolean, default: false },
   slipPic: String,
   createdAt: { type: Date, default: Date.now }
};

var orderSchema = new mongoose.Schema(orderObject);

module.exports = mongoose.model("Order", orderSchema);

//module.exports = orderObject;
