const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bullionSchema = Schema({
    _id : Schema.Types.ObjectId,
    bullionClientName:{
        type:String,
        required:true,
        lowercase:true
    },
    place:{
        type:String,
        required:true,
        lowercase:true
    },
    /*
    gst:{
        type:String
    },*/
    totalBullionPurchase:{
        type:Number,
        default:0
    },
    totalBullionSale:{
        type:Number,
        default:0
    },
    totalPaymentCashDebit:{
        type:Number,
        default:0
    },
    totalPaymentCashCredit:{
        type:Number,
        default:0
    },
    openingTransactionInCashType:{
        type:String //it can be debit /credit
    },
    openingTransactionInBullionType:{
        type:String
    },
    openingTransactionBalanceCash:{
        type:Number
    },
    openingTransactionBalanceBullion:{
        type:Number
    }
    

});

bullionSchema.methods.validateUniqueness=function (cb){
    return mongoose.model('BullionClient').find({bullionClientName:this.bullionClientName,place:this.place},cb);
};


module.exports = mongoose.model('BullionClient',bullionSchema);