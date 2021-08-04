const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = Schema({
    _id : Schema.Types.ObjectId,
    client :{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    date:{type:Date,required:true},
    //product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',requied:true},
   // purchaseType:{type:String},
    //purchaseWeight:{type:Number,required:true},
   // purchaseNumber:{type:Number},
    //purchaseTunch:{type:Number,required:true},
    //purchaseRatePerGram:{type:Number},
    //purchaseLabourPerKg:{type:Number,required:true},
   // purchaseLabourPerPiece:{type:Number},
    purchaseSilver:{type:Number,required:true},
    purchaseCash:{type:Number,required:true},
    purchaseProductInfo:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',requied:true},
        purchaseWeight:{type:Number,required:true},
        purchaseTunch:{type:Number,required:true},
        purchaseLabourPerKg:{type:Number,required:true},
        fineSilver:{type:Number,required:true}
    }]
});

module.exports=mongoose.model('Purchase',purchaseSchema);