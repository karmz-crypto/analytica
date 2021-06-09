const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = Schema({
    _id : Schema.Types.ObjectId,
    client :{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
    date:{type:Date,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    productWeight:{type:Number},
    productNumber:{type:Number},
    salesTunch:{type:Number},
    salesRatePerGram:{type:Number},
    salesLabourPerKg:{type:Number},
    salesLabourPerPiece:{type:Number},
    salesSilverCredit:{type:Number},
    salesCashCredit:{type:Number}
});

module.exports=mongoose.model('Sales',salesSchema);