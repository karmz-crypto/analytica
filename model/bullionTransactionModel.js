const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//sales & purchase are both recorded by this transaction model and this transaction is specific for bullion traders
//not nay regular clients with product purchase sale transactions, therefore any bullion payment made to a normal 
//client will not be recorded by this model instead it will be recorded by the normal payment model of a client
// if a bullion payment is doe to  normal client in that case only the bullion stock model will be affected and
//recorded with a transactionTo variable of the bullinstock model.
/* th concept is to manipulate the entry of the data in a way that both sales and purchase are recorded in a single
model 
logic :
criteria 1.
if()
tansaction type :debit
transactionBy : bullion { paymentInCash will be credit for the master client and the payment status will therefore
be minus with the bullion client payment Status} 
criteria 2.
if()
transaction type: debit 
transactionBy: cash { paymentInBullion will be credit for the master client and the bullion stock will see a rise.}*/
const bullionTransactionSchema =Schema({
    _id : Schema.Types.ObjectId,
    transactionType:{
        type:String,   //buy/sell
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    client:{type:mongoose.Schema.Types.ObjectId,ref:'BullionClient',required:true},
    bullionType:{
        type:String,
        default:'9999_bullion'
    },
    bullionSerialNumber:{
        type:String,
        default:'0000'
    },
    bullionTunch:{
        type:Number,
        default:100
    },
    bullionWeight:{
        type:Number,
        required:true
    },
    bullionFineWeight:{type:Number},
    bullionRateOfCurrentTransaction:{
        type:Number
    },
    
    estimatedCashPaymentOfCurrentTransaction:{ //this will affect the cash pool of the user either credit/debit.
        type:Number,
        required:true
    },
    actualCashPaymentInTheTransaction:{
        type:Number,
        required:true
    },
    pendingCashAmountInTheTransaction:{
        type:Number,
        required:true
    },
    transactionStatus:{
        type:String,
        required:true
    },
    kachiDetails:[{ 
        kachiTunchNum:{type:String,required:true},
        kachiTunch:{type:Number,required:true},
        kachiWeight:{type:Number,required:true},
        kachiFineWeight:{type:Number,required:true}
    }]
});

module.exports = mongoose.model('BullionTransactionModel', bullionTransactionSchema);