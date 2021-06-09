const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    _id:Schema.Types.ObjectId,
    //productId:{type:String,required:true,unique:true,lowecase:true},
    productDesc:{type:String,required:true,lowercase:true},
    productTunch:{type:Number,required:true},
    //productInStock:[{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}],
    //productOutStock:[{type:mongoose.Schema.Types.ObjectId,ref:'Sales'}]
    totalProductPurchase:{
        type:Number,
        default:0
    },
    totalProductSale:{
        type:Number,
        default:0
    },
    numberOfPurchase:{
        type:Number,
        default:0
    },
    numberofSale:{
        type:Number,
        default:0
    },
    productInStock:{
        type:Number,
        default:0
    },
    productStatus:{
        type:Boolean
    },
    productStockMessage:{
        type:String
    },
    stockType:{
        type:String,
        default:'regular'
    }

    
});

productSchema.methods.validateUniqueness=function (cb){
    return mongoose.model('Product').find({productDesc:this.productDesc,productTunch:this.productTunch},cb);
};

module.exports = mongoose.model('Product',productSchema);

/*product id :
eg: pure bartan plain 93 - plain-su-pure-93
    pure bartan plain 97 - plain-su-pure-97
    chatra 65            - fancy-chatra-65
    fancy dinner set 93  - fancy-su-93
*/