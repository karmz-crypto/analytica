const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//this stock model will only have one id and will keep changing wrt every transaction 
const bullionStockSchema = Schema({ 
    _id : Schema.Types.ObjectId,
   bullionTransactionId:{type:mongoose.Schema.Types.ObjectId,ref:'BullionTransactionModel',required:true},
    totalBullionStock:{ //= totalBullionPurchase-totalBullionSale
        type:Number,
        default:0
    },
    totalBullionPurchase:{
        type:Number,
        default:0
    },
    totalBullionSale:{
        type:Number,
        default:0
    },
    totalNumberOfBullionPurchase:{
        type:Number,
        default:0
    },
    totalNumberOfBullionSale:{
        type:Number,
        default:0
    }
    
    
});

module.exports = mongoose.model('BullionStockModel',bullionStockSchema);