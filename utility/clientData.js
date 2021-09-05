const clientModel =require('../model/ClientsModel');
const mongoose = require('mongoose');

function getClientData(req,res){
    if(req.params.id){
        var promiseData = new Promise((resolve,reject)=>{
            var query = clientModel.findById(req.params.id).exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
        var promiseData = new Promise((resolve,reject)=>{
            var query = clientModel.find().exec();
            if(query){resolve(query)}else{reject(query)}
        });
    }
    return promiseData;
}

function updateSaleClientModel(clientId,clientData){
    /*purchaseProduct:[{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}],
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
    paymentStatusCash:{ //=totalsalecash-totalpurchasecash 
        type:Number,
        default:0
    },
    paymentStatusBullion:{type:Number,default:0}, */

    clientModel.findById(clientId).exec().then(
        data=>{
              data.salesProduct.push(clientData.saleTransactionId);
              data.saleCount += parseInt(1);
              data.totalSaleCash += clientData.totalSaleCash;
              data.totalSaleSilver += clientData.totalSaleSilver;
              data.save().then(
                  data=>{
                      data.paymentStatusBullion = data.totalPaymentSilver + (data.totalSaleSilver-data.totalPurchaseSilver);
                      data.paymentStatusCash = data.totalPaymentCash + (data.totalSaleCash-data.totalPurchaseCash);
                      data.save().then(data=>{console.log(data)}).catch();
                  }
              ).catch();
              
           
        }).catch();
}

let clientDbOperate = {getClientData,updateSaleClientModel};
module.exports = clientDbOperate;