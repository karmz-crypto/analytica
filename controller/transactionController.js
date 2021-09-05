const purchaseModel = require('../model/PurchaseModel');
const salesModel = require('../model/SalesModel');
const productModel = require('../model/ProductModel');
const clientModel = require('../model/ClientsModel');
const mongoose = require('mongoose');
const purchaseData = require('../utility/purchaseData');
const productData = require('../utility/productData');
const clientData = require('../utility/clientData');
const salesData = require('../utility/saleData');
const processDataPurchase = require('../utility/purchaseProcess');
const processDataSale = require('../utility/saleProcess');

exports.getTransactions = (req,res)=>{ //console.log('transaction');
    let purchase = purchaseData.getPurchaseData(req,res);
    let product = productData.getProductData(req,res);
    let client = clientData.getClientData(req,res);
    let sale = salesData.getSaleData(req,res);
    let processedPurchase = processDataPurchase.processPurchase(purchase,new Date().getMonth());
    let processedSale = processDataSale.processSale(sale,new Date().getMonth());
    Promise.all([product,client,purchase,processedPurchase,sale,processedSale]).then(result=>{ //console.log(result[5]);
        res.render('transaction',{pageTitle:'Transactions',
            clients:result[1],products:result[0],purchase:result[2],sales:result[4],
            currentYearMonthlyPurchase:result[3].currentYearMonthlyPurchase,
            previousYearMonthlyPurchase:result[3].previousYearMonthlyPurchase,
            currentYearMonthlySale:result[5].currentYearMonthlySale,
            previousYearMonthlySale:result[5].previousYearMonthlySale
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

exports.getTransactionSale = (req,res)=>{
    if(req.params.id==='searchName'||req.params.id==='searchDate'){  //console.log(req.body.name);
        let searchDataItem = salesData.searchSaleData(req,res);
        //console.log(searchDataItem);
        Promise.all([searchDataItem]).then(result=>{
             searchedDataItem = result[0];//console.log(searchedDataItem);
    
             res.send(searchedDataItem);
            
        }).catch(error=>{res.send(error)});
    
       }else{
        let sales = salesData.getSaleData(req,res);
        Promise.all([sales]).then(result=>{
            saleDataItem = result[0];
            res.send(saleDataItem);
        }).catch(error=>{res.send(error)});
    }
};



exports.addSalesTransaction = (req,res)=>{
    //console.log('u r here ');
    let sale = salesData.addSales(req,res);
    Promise.all([sale]).then(result=>{
        if(result){res.send(true)}
    }).catch(error=>{res.send('Faild To add Sales To Database.')});
    //res.send(true);
};
