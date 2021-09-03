const purchaseModel = require('../model/PurchaseModel');
const clientModel = require('../model/ClientsModel');
const mongoose = require('mongoose');
//const { getPurchase } = require('../controller/purchaseController');

function getPurchaseData(req,res){

    var paramId = req.params.id;
    if(paramId){
        //var query = purchaseModel.findById(paramId).exec();
        var promiseData = new Promise((resolve,reject)=>{
            var query = purchaseModel.findById(paramId).populate('purchaseProductInfo.productId client').sort('-date').exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
       // var query = purchaseModel.find().exec();
        var promiseData = new Promise((resolve,reject)=>{
            var query = purchaseModel.find({}).populate({path:'purchaseProductInfo.productId',model:'Product',path:'client',model:'Client'}).sort('-date').exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }
    return promiseData;
}

function searchPurchaseData(req,res){ //console.log('here');
    if(req.params.id==='searchName'){
       var promiseData = new Promise((resolve,reject)=>{
           let query = clientModel.find({clientName:req.body.name}).populate({path:'purchaseProduct',model:'Purchase',populate:{path:'purchaseProductInfo.productId',model:'Product'}}).sort('-date').exec();
           if(query){resolve(query)}else{reject(error)}
       }); 
    }else{
        var promiseData = new Promise((resolve,reject)=>{
            let query = purchaseModel.find({}).populate('purchaseProductInfo.productId client').sort('-date').exec();
            if(query){resolve(query)}else{reject(error)}
        }); 
    }
    return promiseData;
}


let purchaseDbOperation = {getPurchaseData,searchPurchaseData};

module.exports = purchaseDbOperation ; 