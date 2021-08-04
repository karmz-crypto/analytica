const purchaseModel = require('../model/PurchaseModel');
const salesModel = require('../model/SalesModel');
const productModel = require('../model/ProductModel');
const clientModel = require('../model/ClientsModel');
const mongoose = require('mongoose');
const purchaseData = require('../utility/purchaseData');
const productData = require('../utility/productData');
const clientData = require('../utility/clientData');

exports.getTransactions = (req,res)=>{
    let product = productData.getProductData(req,res);
    let client = clientData.getClientData(req,res);
    Promise.all([product,client]).then(result=>{
        res.render('transaction',{pageTitle:'Transactions',clients:result[1],products:result[0]});
    }).catch();
    
};