const productModel= require('../model/ProductModel');
const clientModel = require('../model/ClientsModel');
const purchaseModel = require('../model/PurchaseModel');
const salesModel = require('../model/SalesModel');
const paymentModel = require('../model/PaymentModel');
const bullionClientModel = require('../model/bullionClientModel');
const mongoose = require('mongoose');

 function getDataFromDbFunction(){
    var promiseObject={};
 var p1 = new Promise(function(resolve,reject){
    var query1 = productModel.find({}).exec();
    if(query1){resolve(query1)}else { reject(error);}
  });

  var p2 = new Promise(function(resolve,reject){
    var query2 = clientModel.find({})
        .populate({path:'purchaseProduct',model:'Purchase',populate:{path:'client',model:'Client'}}).exec();
    if (query2){resolve(query2)}else { reject(error);}
  });
  var p3 = new Promise(function(resolve,reject){
    var query3 = purchaseModel.find({}).populate('product client').sort('-date').exec();
    if(query3){resolve(query3)}else{reject(error);}
  });
  var p4 = new Promise(function(resolve,reject){
    var query4 = bullionClientModel.find({}).exec();
    if(query4){resolve(query4)}else{reject(error);}
  });
  promiseObject.p1=p1;
  promiseObject.p2=p2;
  promiseObject.p3=p3;
  promiseObject.p4 =p4;
  return promiseObject;
  

}

module.exports= getDataFromDbFunction;