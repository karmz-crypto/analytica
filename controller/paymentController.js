const paymentModel = require('../model/PaymentModel');
const clientsModel = require('../model/ClientsModel');
const productModel = require('../model/ProductModel');
const getDataFromDb = require('../utility/getDataFromDb');
const mongoose = require('mongoose');

exports.getPayment = (req,res)=>{
    res.render('paymentView',{
        pageTitle:'Payment'
    });
};



exports.getPaymentForm = (req,res)=>{

    var dataArray=getDataFromDb();
    Promise.all([dataArray.p1,dataArray.p2]).then((result)=>{
        clientArray = result[1]; 
        productArray=result[0];
        res.render('addPaymentForm',{
            pageTitle:'Payment Form',
            clientElement:clientArray,
            productElement:productArray
        });
    }).catch(error=>{res.render('error',{pageTitle:'Error',error:error})});

   
};