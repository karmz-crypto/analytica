const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = Schema({
    client:{type:mongoose.Schema.Types.ObjectId,required:true},
    date:{type:Date},
    paymentInCash:{type:Boolean},
    paymentInMetal:{type:Boolean},
    paymentInBank:{type:Boolean},
    paymentByCheque:{type:Boolean},
    paymentByRtgs:{type:Boolean},
    transactionNumber:{type:String,lowercase:true,unique:true},
    metalTunch:{type:Number},
    cashAmount:{type:Number},
    metalWeight:{type:Number},
    addinalInfo:{type:String},
    location:{type:String},
    paymentDebit:{type:Boolean},
    paymentCredit:{type:Boolean}

});

module.exports = mongoose.model('Payment',paymentSchema);