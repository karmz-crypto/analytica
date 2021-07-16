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
    if(req.body.transactionStatus!=='transactionComplete'){
        let cashAmount;
        if(req.body.bullionRateOfCurrentTransaction!==undefined){
            //console.log(req.body.bu)
            cashAmount = (req.body.bullionWeight*req.body.bullionRate)/1000
        }else{
            cashAmount = req.body.cashAmount;
        }
   const bullionTransaction = new bullionTransactionModel({
    _id:new mongoose.Types.ObjectId(),
    transactionType:req.body.transactionType,
    date:new Date(req.body.date),
    client:ObjectID(req.body.clientId),
    bullionWeight:req.body.bullionWeight,
    bullionRateOfCurrentTransaction:req.body.bullionRate,
    cashPaymentOfCurrentTransaction:parseInt(cashAmount),
    transactionStatus:req.body.transactionStatus,
    bullionFineWeight:req.body.bullionWeight
   });

   bullionTransaction.save()
    .then()
    .catch();
    }//closing of if 
    else{
        if(req.body.transactionType!=='sell_bullion'&& req.body.bullionType!=='kachi' && req.body.bullionType!=='choursa')
        { //this block is for buy_bullion & 9999_bullion 
            const bullionTransaction = new bullionTransactionModel({
                _id:new mongoose.Types.ObjectId(),
                transactionType:req.body.transactionType,
                date:new Date(req.body.date),
                client:ObjectID(req.body.clientId),
                bullionWeight:req.body.bullionWeight,
                bullionRateOfCurrentTransaction:req.body.bullionRate,
                cashPaymentOfCurrentTransaction:(req.body.bullionWeight*req.body.bullionRate)/1000,
                transactionStatus:req.body.transactionStatus,
                bullionType:req.body.bullionType,
                bullionFineWeight:req.body.bullionWeight
               });
            
               bullionTransaction.save()
                .then((transactionData)=>{ 
                    bullionStockModel.find({bullionType:'9999_bullion'}).exec().then((data)=>{
                        if(data.length===0)
                        {   //console.log(count);
                            //console.log(transactionData._id);
                            const bullionStock = new bullionStockModel({
                                _id:new mongoose.Types.ObjectId(),
                                bullionTransactionId:[ObjectID(transactionData._id)],
                                bullionType:'9999_bullion',
                                totalBullionStock:transactionData.bullionFineWeight,
                                totalBullionPurchase:transactionData.bullionFineWeight,
                                totalNumberOfBullionPurchase: 1,
                                
                               
                            }).save().then((element)=>{//   console.log(element);
                               // bullionStockModel.find({id:element._id}).exec().then((element)=>{
                                   // element.totalBullionStock +=transactionData.bullionWeight,
                                   // element.totalBullionPurchase +=transactionData.bullionWeight,
                                   // element.totalNumberOfBullionPurchase+=1
                                }).catch(); 
                        }//closing of if...count===0;
                        else
                        {
                            bullionStockModel.find({bullionType:'9999_bullion'}).exec()
                                .then((data)=>{
                                    data.forEach((element)=>{
                                        element.bullionTransactionId.push(transactionData._id);
                                        element.totalBullionStock += parseInt(transactionData.bullionFineWeight);
                                        element.totalBullionPurchase += parseInt(transactionData.bullionFineWeight);
                                        element.totalNumberOfBullionPurchase += parseInt(1);
                                        element.save().then(()=>{}).catch();
                                        
                                    });
                                    
                                })
                                .catch();
                        }
                                
                            }).catch(); //closing of then((count))
                        
                    }).catch();
                   
               
        }//closing of if...!sell_bullion
        else if(req.body.transactionType!=='sell_bullion'&& req.body.bullionType!=='kachi' && req.body.bullionType!=='9999_bullion')
        {
            const bullionTransaction = new bullionTransactionModel({
                _id:new mongoose.Types.ObjectId(),
                transactionType:req.body.transactionType,
                date:new Date(req.body.date),
                client:ObjectID(req.body.clientId),
                bullionWeight:req.body.bullionWeight,
                bullionRateOfCurrentTransaction:req.body.bullionRate,
                cashPaymentOfCurrentTransaction:(req.body.bullionWeight*req.body.bullionRate)/1000,
                transactionStatus:req.body.transactionStatus,
                bullionType:req.body.bullionType,
                bullionTunch:req.body.bullionTunch,
                bullionFineWeight:req.body.bullionWeight*req.body.bullionChoursaTunch/100
               });
               bullionTransaction.save()
                .then((transactionData)=>{
                    bullionStockModel.find({bullionType:'choursa'}).exec()
                        .then((data)=>{ //console.log(data.length);
                            if(data.length===0)
                            { 
                                //console.log('right track'); //added .... del
                                const bullionStock = new bullionStockModel({
                                _id:new mongoose.Types.ObjectId(),
                                bullionTransactionId:[ObjectID(transactionData._id)],
                                bullionType:'choursa',
                                totalBullionStock:transactionData.bullionFineWeight,
                                totalBullionPurchase:transactionData.bullionFineWeight,
                                totalNumberOfBullionPurchase: 1
                                }).save().then(()=>{}).catch();
                        }else{ 
                                //console.log('u r here') ; //this is added ...del ..
                            data.forEach((element)=>{
                                element.bullionTransactionId.push(transactionData._id);
                                        element.totalBullionStock += parseInt(transactionData.bullionFineWeight);
                                        element.totalBullionPurchase += parseInt(transactionData.bullionFineWeight);
                                        element.totalNumberOfBullionPurchase += parseInt(1);
                                        element.save().then(()=>{}).catch();
                                
                               
                            });

                        }
                    })
                        .catch();
                }).catch();
        }
        

    }
    
}


function pendingTransactionData(){ //for bullionView page .....
    var pending = new Promise((resolve,reject)=>{
        var query = bullionTransactionModel.find({transactionStatus:"transactionPending"})
            .populate('client');
        if(query){resolve(query)}else{reject(error)}
    });
    return pending;
}



module.exports = {bullionTransactionDbEvents,pendingTransactionData};

