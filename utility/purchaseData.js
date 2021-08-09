const purchaseModel = require('../model/PurchaseModel');
const mongoose = require('mongoose');
//const { getPurchase } = require('../controller/purchaseController');

function getPurchaseData(req,res){

    var paramId = req.params.id;
    if(paramId){
        //var query = purchaseModel.findById(paramId).exec();
        var promiseData = new Promise((resolve,reject)=>{
            var query = purchaseModel.findById(paramId).exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
       // var query = purchaseModel.find().exec();
        var promiseData = new Promise((resolve,reject)=>{
            var query = purchaseModel.find().exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }
    return promiseData;
}

let purchaseDbOperation = {getPurchaseData};

module.exports = purchaseDbOperation ; 