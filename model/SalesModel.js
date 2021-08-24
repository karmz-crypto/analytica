const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = Schema({
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
    saleSilver:{type:Number,required:true},
    saleCash:{type:Number,required:true},
    saleProductInfo:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',requied:true},
        saleWeight:{type:Number,required:true},
        saleTunch:{type:Number,required:true},
        saleLabourPerKg:{type:Number,required:true},
        fineSilver:{type:Number,required:true}
    }]
});

module.exports=mongoose.model('Sales',salesSchema);