const productModel = require('../model/ProductModel');
const mongoose = require('mongoose');

function getProductData(req,res){
    if(req.params.id){
        var promiseData = new Promise((resolve,reject)=>{
            var query = productModel.findById(req.params.id).exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }else{
        var promiseData = new Promise((resolve,reject)=>{
            var query = productModel.find().exec();
            if(query){resolve(query)}else{reject(error)}
        });
    }
    return promiseData;
}

function reduceProductData(productId,saleWeight){ //for sale operation of the product 
    // requirements .. 1. productId 2. sale product weight 

   productModel.findById(productId).exec().then(
       data=>{
           data.totalProductSale += saleWeight;
           data.numberofSale += parseInt(1) ;
           data.productInStock -= saleWeight;
           modifyProductMetadata(data);
           data.save().then().catch();
       }
   ).catch();
    
}

function addProductData(req,res){ // for purchase operation of the product
    //requirements ..1. productId 2. purchase product weight
    modifyProductMetadata('purchase',infoObject);
}

function modifyProductMetadata(productData){
    if(productData.productInStock<1500){
        productData.productStockMessage ="Product Running Out Of Stock !!"
    }else if(productData.productInStock>1500 && productData.productInStock <2000){
        productData.productStockMessage = "Product On The Verge Of Running Out Of Stock"
    }else{
        productData.productStockMessage = `Product Availabe : ${productData.productInStock}`;
    }

}

let productDbOperation = {getProductData,reduceProductData};

module.exports = productDbOperation;

