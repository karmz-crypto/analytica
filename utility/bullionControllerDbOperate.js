const mongoose = require('mongoose');
const bullionClientModel = require('../model/bullionClientModel');
//const bullionTransactionModel = require('../model/bullionTransactionModel');
const bullionStockModel = require('../model/bullionStockModel');
const bullionTransactionModel = require('../model/bullionTransactionModel');
const { ObjectID } = require('bson');
/*
function addBullionClientFunction(req,res){
    //console.log('in add bullions');
    let returnFunc;
    bullionClientModel.countDocuments()
        .then((countBefore)=>{
            const bullionClient = new bullionClientModel({
                _id:new mongoose.Types.ObjectId(),
                bullionClientName:req.body.bullionClientName,
                place:req.body.city
            });
            bullionClient.save().then(()=>{return countBefore}).catch()})
            .catch();
    /*
    const bullionClient = new bullionClientModel({
        _id:new mongoose.Types.ObjectId(),
        bullionClientName:req.body.bullionClientName,
        place:req.body.city
    });
    bullionClient.save().then(()=>{
    }).catch(); 
    
    
} */

function bullionTransactionDbEvents(req,res){
   const bullionTransaction = new bullionTransactionModel({
    _id:new mongoose.Types.ObjectId(),
    transactionType:req.body.transactionType,
    date:new Date(req.body.date),
    client:ObjectID(req.body.clientId),
    bullionWeight:req.body.bullionWeight,
    bullionRateOfCurrentTransaction:req.body.bullionRate,
    cashPaymentOfCurrentTransaction:(req.body.bullionWeight*req.body.bullionRate)/1000,
    transactionStatus:req.body.transactionStatus
   });

   bullionTransaction.save()
    .then()
    .catch();
}

function pendingTransactionData(){
    var pending = new Promise((resolve,reject)=>{
        var query = bullionTransactionModel.find({transactionStatus:"transactionPending"})
            .populate('client');
        if(query){resolve(query)}else{reject(error)}
    });
    return pending;
}



module.exports = {bullionTransactionDbEvents,pendingTransactionData};

