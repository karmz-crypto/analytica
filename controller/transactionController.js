const purchaseModel = require('../model/PurchaseModel');
const salesModel = require('../model/SalesModel');
const productModel = require('../model/ProductModel');
const clientModel = require('../model/ClientsModel');
const mongoose = require('mongoose');
const purchaseData = require('../utility/purchaseData');
const productData = require('../utility/productData');
const clientData = require('../utility/clientData');

exports.getTransactions = (req,res)=>{
    let purchase = purchaseData.getPurchaseData(req,res);
    let product = productData.getProductData(req,res);
    let client = clientData.getClientData(req,res);
    Promise.all([product,client,purchase]).then(result=>{
        res.render('transaction',{pageTitle:'Transactions',
            clients:result[1],products:result[0],purchase:result[2]
        });
    }).catch();
     
};

exports.getTransactionPurchase = (req,res)=>{
   if(req.params.id==='searchName'||req.params.id==='searchDate'){  //console.log(req.body.name);
    let searchDataItem = purchaseData.searchPurchaseData(req,res);
    //console.log(searchDataItem);
    Promise.all([searchDataItem]).then(result=>{
         searchedDataItem = result[0];//console.log(searchedDataItem);

         res.send(searchedDataItem);
        
    }).catch(error=>{res.send(error)});

   }else{
    let purchase = purchaseData.getPurchaseData(req,res);
    Promise.all([purchase]).then(result=>{
        purchaseDataItem = result[0];
        res.send(purchaseDataItem);
    }).catch(error=>{res.send(error)});
   }
    
};
