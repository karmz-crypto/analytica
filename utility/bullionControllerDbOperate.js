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
        console.log(req.body.date);
        let cashAmount = 0; 
        let bullionRate = 0;
        let pendingCashAmount =0;
        if(req.body.bullionRate!==undefined && req.body.cashAmount!==undefined){ 
            bullionRate=req.body.bullionRate;
            cashAmount = parseInt(req.body.bullionWeight)*parseInt(req.body.bullionRate)/1000;
            pendingCashAmount= req.body.cashAmount - cashAmount;

            
        }else if(req.body.cashAmount!==undefined && req.body.bullionRate===undefined){ console.log('in else');
            cashAmount = parseInt(req.body.cashAmount);
            bullionRate = 0;
        }
        else if(req.body.cashAmount===undefined && req.body.bullionRate!==undefined){
            cashAmount = req.body.bullionRate*req.body.bullionWeight/1000;
            req.body.cashAmount = 0;
            bullionRate = req.body.bullionRate;
        }else{
            cashAmount=0;
            req.body.cashAmount=0;
        }
        console.log(typeof(cashAmount));
        console.log(typeof(req.body.cashAmount));
   const bullionTransaction = new bullionTransactionModel({
    _id:new mongoose.Types.ObjectId(),
    transactionType:req.body.transactionType,
    date:new Date(req.body.date),
    client:ObjectID(req.body.clientId),
    bullionWeight:req.body.bullionWeight,
    bullionRateOfCurrentTransaction:bullionRate,
    estimatedCashPaymentOfCurrentTransaction:parseInt(cashAmount),
    actualCashPaymentInTheTransaction:parseInt(req.body.cashAmount),
    transactionStatus:req.body.transactionStatus,
    bullionFineWeight:req.body.bullionWeight,
    pendingCashAmountInTheTransaction: pendingCashAmount
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
                cashPaymentOfCurrentTransaction:(req.body.bullionFineWeight*req.body.bullionRate)/1000,
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
        }else if(req.body.transactionType!=='sell_bullion'&& req.body.bullionType!=='choursa' && req.body.bullionType!=='9999_bullion')
        {   
            const bullionTransaction = new bullionTransactionModel({
                _id:new mongoose.Types.ObjectId(),
                transactionType:req.body.transactionType,
                date:new Date(req.body.date),
                client:ObjectID(req.body.clientId),
                bullionWeight:req.body.bullionWeight, // chng
                bullionRateOfCurrentTransaction:req.body.bullionRate,
                cashPaymentOfCurrentTransaction:(req.body.bullionFineWeight*req.body.bullionRate)/1000,
                transactionStatus:req.body.transactionStatus,
                bullionType:req.body.bullionType,
                bullionTunch:req.body.bullionTunch,
                //bullionFineWeight:req.body.bullionWeight*req.body.bullionChoursaTunch/100, //chng
                bullionFineWeight:req.body.bullionFineWeight
               }).save().then((transactionData)=>{
                   bullionTransactionModel.findById(transactionData._id).exec().then((element)=>{ 
                    var calculatedBullionweight = 0;
                    for(var i=0;i<(req.body.tunchNumber).length;i++){
                        //console.log(req.body.tunchNumber);
                        element.kachiDetails.push({kachiTunchNum:req.body.tunchNumber[i],
                                             kachiTunch:req.body.kachiTunch[i],
                                         kachiWeight:req.body.kachiWeight[i],
                                     kachiFineWeight:(req.body.kachiTunch[i])*(req.body.kachiWeight[i])/100});
                                     
                                     calculatedBullionweight += parseInt(req.body.kachiWeight[i]);
                                     element.bullionWeight = calculatedBullionweight;
                                     
                    }element.save().then((data)=>{console.log(data);
                        bullionStockModel.find({bullionType:'kachi'}).exec()
                        .then((transactData)=>{ //console.log(data.length);
                            if(transactData.length===0)
                            { 
                                //console.log('right track'); //added .... del
                                const bullionStock = new bullionStockModel({
                                _id:new mongoose.Types.ObjectId(),
                                bullionTransactionId:[ObjectID(transactionData._id)],
                                bullionType:'kachi',
                                totalBullionStock:transactionData.bullionFineWeight,
                                totalBullionPurchase:transactionData.bullionFineWeight,
                                totalNumberOfBullionPurchase: 1
                                }).save().then(()=>{}).catch();
                        }else{ 
                                //console.log('u r here') ; //this is added ...del ..
                            transactData.forEach((element)=>{
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
                   }).catch();
                  
               }).catch(); 
        }
        

    }
    
}


function pendingTransactionData(){ //for bullionView page .....
    var pending = new Promise((resolve,reject)=>{
        var query = bullionTransactionModel.find({transactionStatus:"transactionPending"})
            .populate('client').sort('-date');
        if(query){resolve(query)}else{reject(error)}
    });
    return pending;
}

function completeTransactionData(){
    var complete = new Promise((resolve,reject)=>{
        var query = bullionTransactionModel.find({transactionStatus:"transactionComplete"})
            .populate('client').sort('-date');
            if(query){resolve(query)}else{reject(error)}
    });
    return complete;
}



module.exports = {bullionTransactionDbEvents,pendingTransactionData,completeTransactionData};

