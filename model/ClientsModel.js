const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const clientSchema = Schema({
    _id : Schema.Types.ObjectId,
    clientName :{
        type:String,
        required : true,
        lowercase:true
    },
    email :{
        type:String,
        required:true,
        lowercase:true,
        unique : true
    },
    purchaseProduct:[{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}],
    salesProduct:[{type:mongoose.Schema.Types.ObjectId,ref:'Sales'}],
    payments : [{type:mongoose.Schema.Types.ObjectId,ref:'Payment'}],
    purchaseCount:{
        type:Number,
        default:0
    },
    saleCount:{
        type:Number,
        default:0
    },
    totalPurchaseSilver:{
        type:Number,
        default:0
    },
    totalPurchaseCash:{
        type:Number,
        default:0
    },
    totalSaleCash:{
        type:Number,
        default:0
    },
    totalSaleSilver:{
        type:Number,
        default:0
    },
    totalPaymentSilver:{
        type:Number,
        default:0
    },
   
    totalPaymentCash:{
        type:Number,
        default:0
    },
    paymentStatus:{
        type:Number,
        default:0
    },
    silverRateEntry:[{ type:Number, default:0}],
    silverRateEntryDate:[{ type:Date }]
});

module.exports = mongoose.model('Client',clientSchema);

