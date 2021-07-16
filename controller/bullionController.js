const {bullionTransactionDbEvents,pendingTransactionData} = require('../utility/bullionControllerDbOperate');
//const pendingTransactionData = require('../utility/bullionControllerDbOperate');
const getDataFromDb = require('../utility/getDataFromDb');
const mongoose = require('mongoose');
const bullionClientModel = require('../model/bullionClientModel');
const bullionTransactionModel = require('../model/bullionTransactionModel');



exports.getBullion=(req,res)=>{
    var dataArray = getDataFromDb();
    var pendingTransacData = pendingTransactionData();
    Promise.all([dataArray.p4,pendingTransacData,dataArray.p5]).then((result)=>{
        //console.log(result[1]);
        res.render('bullionView',{pageTitle:'Bullion',pendingTransactionBullionData:result[1],bullionStock:result[2]});
    }).catch();
    
};

exports.addBullionTransactionForm = (req,res)=>{
    
    var dataArray = getDataFromDb();
    Promise.all([dataArray.p1,dataArray.p2,dataArray.p3,dataArray.p4,dataArray.p5]).then((result)=>{
        res.render('bullionTransactionForm',
            {pageTitle:'Bullion Transc.',bullionClient:result[3]}
            );
    }).catch(error=>console.log(error));
    
};
/* addBullionTransaction : will monitor every transaction of the bullion from bullion trading to bullion as a payment*/
exports.addBullionTransaction = (req,res)=>{
    /* the problem with the code is just that the countDocuments was showing similar counts and the logic was not 
        executing...................
    bullionTransactionModel.countDocuments()
        .then((countBefore)=>{ console.log(countBefore); bullionControllerDbOperate(req,res);
            console.log('func returned');
            bullionTransactionModel.init()
                .then(()=>{
                    bullionTransactionModel.countDocuments()
                .then((countAfter)=>{ console.log(countAfter);
                    if(countAfter!==countBefore){
                        res.render('successful',{pageTitle:'Success'})
                    }else{
                        res.render('error',{pageTitle:'Error',error:'Data Not Updated'})
                    }
                })
                .catch();
                })                  ######## the problem with code was its asynchronous nature the data of doc count
                .catch();                       was not being calculated as easily due to speed of calculation....
        })
        .catch(); */
        /*
        var beforePromise = new Promise((resolve,reject)=>{
            var query1 = bullionTransactionModel.countDocuments();
            if(query1){resolve(query1)}else{reject(error)}
        }); 
         bullionTransactionDbEvents(req,res);
        
        var afterPromise = new Promise((resolve,reject)=>{
            var query2 = bullionTransactionModel.countDocuments();
            if(query2){resolve(query2)}else{(reject(error))}
        });
        
       Promise.all([beforePromise,afterPromise]).then((result)=>{ console.log(result[0],result[1]);
        if(result[0]!==result[1]){ 
            res.render('success',{pageTitle:'Success'})
        }else{res.render('error',{pageTitle:'Error',error:'Data Not Added'})}
    }); */

    bullionTransactionModel.estimatedDocumentCount().exec().then((count1)=>{ console.log(count1);
        bullionTransactionDbEvents(req,res);
        setTimeout(()=>{ bullionTransactionModel.estimatedDocumentCount().exec().then((count2)=>{ console.log(count2);
            if(count1!==count2){
                res.render('success',{pageTitle:'Success'})
            }else{
                res.render('error',{pageTitle:'Error',error:'Data Not Added'})
            }
        }).catch()},3000);
       
    }).catch();
        
       

};

exports.addBullionClientForm = (req,res)=>{
    res.render('addBullionClientForm',{pageTitle:'Bullion Client Form'});
};

exports.addBullionClient = (req,res)=>{ 
    bullionClientModel.countDocuments()
    .then((countBefore)=>{ console.log(countBefore);
        const bullionClient = new bullionClientModel({
            _id:new mongoose.Types.ObjectId(),
            bullionClientName:req.body.bullionClientName,
            place:req.body.city
        });
        bullionClient.validateUniqueness((err,bullionClient1)=>{ console.log(bullionClient1);
            if(bullionClient1.length!==0){res.render('error',{pageTitle:'Error',error:'The Client is already Present Try Another Name'})}
            else{bullionClient.save().
                then(()=>{bullionClientModel.countDocuments()
                    .then((countAfter)=>{ console.log(countAfter);
                        if(countAfter!==countBefore){res.render('success',{pageTitle:'Success'})}
                        else{res.render('error',{pageTitle:'Error',error:'Data Not Added To Database'})}
                    })
                    .catch()})
                .catch()}
        });
        })
        .catch();
};